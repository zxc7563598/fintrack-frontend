import axios from 'axios'
import config from './config'
import { encryptRequest } from 'hejunjie-encrypted-request'
import router from '@/router'

let cachedPublicKey = null
let isRefreshing = false
let refreshSubscribers = []

// ====== 工具函数 ======
export async function loadPublicKey() {
	if (cachedPublicKey) return cachedPublicKey
	const res = await fetch('/public_key.pem')
	if (!res.ok) throw new Error('Failed to load public key')
	const key = await res.text()
	cachedPublicKey = key
	return key
}

function onRefreshed(token) {
	refreshSubscribers.forEach(cb => cb(token))
	refreshSubscribers = []
}

function addRefreshSubscriber(cb) {
	refreshSubscribers.push(cb)
}

// ====== axios 实例 ======
const service = axios.create({
	baseURL: config.baseUrl,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
	file: false
})

// 请求拦截器
service.interceptors.request.use(
	async function (cfg) {
		cfg.headers = cfg.headers || {}
		if (!cfg._rawData) {
			cfg._rawData = { ...(cfg.data || {}) }
		}
		let access_token = localStorage.getItem('access_token')
		if (cfg.file) {
			cfg.headers['Content-Type'] = 'multipart/form-data'
		} else {
			if (!cfg.data) cfg.data = {}
			cfg.data = encryptRequest(cfg._rawData, {
				rsaPubKey: await loadPublicKey(),
			})
		}
		if (access_token) {
			cfg.headers['Authorization'] = access_token
		}
		cfg.headers['Accept-Language'] = 'zh'
		return cfg
	},
	function (error) {
		return Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	function (response) {
		const res = response.data
		let refresh_code = [
			"300001",
			"300002"
		];
		if (refresh_code.includes(String(res.code))) {
			const originalRequest = response.config
			if (!isRefreshing) {
				isRefreshing = true
				const refreshToken = localStorage.getItem('refresh_token')
				return service({
					url: config.interface.RefreshTokenHandler,
					method: 'post',
					data: { refresh_token: refreshToken }
				}).then((resp) => {
					if (resp.code === 0) {
						localStorage.setItem('access_token', resp.data.access_token)
						localStorage.setItem('refresh_token', resp.data.refresh_token)
						onRefreshed(resp.data.access_token)
						// 重试原请求
						return service(originalRequest)
					} else {
						router.push('/login')
					}
				}).finally(() => {
					isRefreshing = false
				})
			}
			// 如果正在刷新，挂起请求
			return new Promise(resolve => {
				addRefreshSubscriber(token => {
					resolve(service(originalRequest))
				})
			})
		}
		return res
	},
	function (error) {
		return Promise.reject(error)
	}
)

export default service
