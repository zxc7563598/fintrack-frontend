import { encryptRequest } from "hejunjie-encrypted-request";
import { loadPublicKey } from "@/static/request";
import config from "./config";

/**
 * 发起加密的 SSE 请求
 * @param {string} url 接口地址（自动拼接 baseURL）
 * @param {Object} rawData 原始请求数据（会被加密）
 * @param {Function} onMessage 每条流式 data 回调
 * @param {Function} onError 错误处理
 */
export async function streamRequest({ url, rawData = {}, onMessage, onError }) {
  try {
    const encryptedBody = encryptRequest(rawData, {
      rsaPubKey: await loadPublicKey(),
    });
    const response = await fetch(config.baseUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token") || "",
      },
      body: JSON.stringify(encryptedBody),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        onMessage?.(line);
        onMessage?.("\n");
      }
    }
    if (buffer.length > 0) {
      onMessage?.(buffer);
    }
  } catch (err) {
    onError?.(err);
  }
}
