# 📊 FinBoard

一个基于 **Vue3 + Vite + Vuetify.js** 和 **Go** 的财务管理应用，支持导入 **支付宝/微信等平台的账单信息**，进行统计和分析。  
项目同时支持 **Web 应用模式** 和 **Wails 桌面应用模式**，可灵活运行在浏览器或本地桌面环境。

## ✨ 功能特性

- 支持导入 **支付宝/微信账单** 数据
- 自动分类、统计与图表分析
- 前后端分离，接口统一，方便二次开发
- 基于 **Vuetify.js** 的现代化 UI，响应式设计
- 支持 **Web 服务模式**（浏览器访问）
- 支持 **Wails 桌面应用模式**（Go 打包成本地应用）

---

## 🛠 技术栈

- **前端**: [Vue 3](https://vuejs.org) + [Vite](https://vite.dev) + [Vuetify](https://vuetifyjs.com)
- **后端**: [Go](https://go.dev) + [Wails](https://wails.io)
- **构建与运行**: 前后端分离，支持 Web 与桌面两种模式

---

## 🚀 前端构建说明

前端项目支持两种运行模式：

### 1. Web服务模式

作为独立的 Web 应用运行，通过 HTTP 请求访问后端 API。

#### 开发模式

```bash
pnpm dev
```

#### 构建生产版本

```bash
pnpm build:web
# 或者
pnpm build
```

构建后的文件将输出到 `dist/` 目录。

---

### 2. Wails本地应用模式

作为 Wails 应用的前端，与 Go 后端打包成桌面应用。

#### 开发模式

```bash
pnpm dev:wails
```

#### 构建Wails版本

```bash
pnpm build:wails
```

构建后的文件将输出到 `dist-wails/` 目录。

---

### 部署到 Go 项目

1. 运行 `pnpm build:wails`​
2. 将 `dist-wails/` 目录中的所有文件复制到 Go 项目的 `frontend/build/` 目录
3. 在 Go 项目中运行：

    ```bash
    wails build
    # 或者
    wails dev
    ```

---

## ⚙️ 环境变量

可以通过以下环境变量自定义配置：

- ​`VITE_API_BASE_URL`：API 基础 URL
- ​`VITE_APP_TITLE`：应用标题

---

## 🔒 密钥信息

项目通过 AES + RSA 混合加密，在正式使用前，您需要通过以下命令生成密钥对

```
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public_key.pem
```

并将 `public_key.pem` 放置于本项目的 `public` 目录中

> 相对应的 `private.pem` 需要存放在后端项目跟目录中

---

## 📦 快速开始

### 克隆项目

```bash
git clone https://github.com/你的用户名/你的项目名.git
cd 你的项目名
```

### 安装依赖

```bash
pnpm install
```

### 启动前端开发环境

```bash
pnpm dev
```

### 启动后端 (Go + Wails)

```bash
wails dev
```

## 📸 截图展示（可选）

> 这里可以放一些账单导入界面、统计报表、桌面应用运行效果的截图。
