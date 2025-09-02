# **CPBL 數據視覺化應用程式**

本專案是一個專為中華職棒 (CPBL) 設計的數據視覺化儀表板。旨在提供球迷與數據分析師一個現代化、高互動性的介面，用以查詢、比較並分析球員與球隊的各項表現數據。

## **核心功能 (Features)**

- **即時賽況儀表板**：提供當日賽事的即時比分與球員攻守數據。
- **球員賽季表現趨勢圖**：將球員的各項統計數據（如打擊率、長打率）視覺化為趨勢圖表，方便觀察表現起伏。
- **進階數據查詢**：提供多維度的篩選功能，讓使用者能查詢特定情境下的數據表現（例如：得點圈打擊率、對戰左右投成績）。
- **數據導出的多樣化呈現**：除了表格外，也透過日曆熱圖等方式呈現數據。

## **技術棧 (Tech Stack)**

| 類別     | 技術                                                                                                       |
| :------- | :--------------------------------------------------------------------------------------------------------- |
| **前端** | Next.js (App Router), React 19, TypeScript, TanStack Query, Vitest, Vanilla Extract, Playwright, Storybook |
| **後端** | FastAPI, Python, Docker, PostgreSQL, Alembic                                                               |

## **本地開發環境設定 (Getting Started)**

請依照以下步驟設定本地的前後端開發環境。

### **後端 (Backend)**

後端專案需獨立設定，請參考後端 repository 中的指南。簡要步驟如下：

1. Clone 後端專案 repository。
2. 複製環境變數檔案：cp .env.example .env 並填入所需數值。
3. 使用 Docker 啟動所有服務：docker compose up \-d。
4. 執行資料庫遷移：docker compose exec web alembic upgrade head。
5. 確認後端服務是否正常運行：curl http://127.0.0.1:8000/api/v1/health。

### **前端 (Frontend)**

1. **安裝依賴**：  
   npm install

2. **啟動開發伺服器**：  
   npm run dev

3. 開啟瀏覽器並前往 http://localhost:3000。

## **專案結構 (Folder Structure)**

本專案遵循功能導向的結構，將相關的 UI、邏輯與樣式組織在一起。

.  
├── /app \# Next.js App Router 的頁面與 API 路由 (BFF)  
├── /components \# 可複用的 React 元件  
│ ├── /features \# 與特定業務功能相關的複雜元件 (例如：圖表、儀表板)  
│ └── /ui \# 基礎、通用的 UI 元件 (例如：Button, Table)  
├── /hooks \# 封裝 TanStack Query 的自訂 Hooks，用於數據獲取  
├── /lib \# API Client (apiClient.ts) 與其他共用邏輯、常數  
├── /styles \# 全域樣式與 Vanilla Extract 主題設定 (theme.css.ts)  
├── /tests \# Playwright E2E 測試案例  
└── ...

## **可用腳本 (Available Scripts)**

在專案目錄中，你可以執行以下常用腳本：

| Script        | 描述                                    |
| :------------ | :-------------------------------------- |
| npm run dev   | 在開發模式下啟動應用程式。              |
| npm run build | 為生產環境建置應用程式。                |
| npm run start | 啟動已建置完成的生產環境伺服器。        |
| npm run lint  | 使用 Next.js 內建的 ESLint 檢查程式碼。 |
| npm run test  | 使用 Vitest 執行單元與元件測試。        |
