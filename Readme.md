# 循環行事曆建立器

這是一個 Google Apps Script 專案，可以幫助使用者在 Google 日曆中自動建立週期性事件。

[English](./Readme_eng.md) | [繁體中文](./Readme.md)

## 支持這個專案

如果您覺得這個專案對您有幫助，可以請我喝杯咖啡！

<a href="https://www.buymeacoffee.com/whoami885" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="60" width="217">
</a>

## 功能特點

- 自動在選定的 Google 日曆中建立週期性事件
- 支援多個輪流事件名稱
- 自動跳過假日（功能待實作）
- 事件建立在週一至週五
- 可一鍵刪除所有自動建立的事件

## 使用方法

1. 在 Google Apps Script 中建立新專案
2. 複製 `Code.gs` 和 `Index.html` 的內容到對應檔案
3. 部署為網頁應用程式
4. 授予必要的日曆存取權限
5. 開始使用！

### 詳細步驟

1. 從下拉選單中選擇要建立事件的日曆
2. 輸入一個或多個事件名稱
3. 點擊「建立事件」按鈕
4. 系統會自動在接下來一年內的每個工作週建立對應事件

## 系統需求

- Google 帳號
- Google 日曆的存取權限

## 技術說明

- 使用 Google Apps Script 開發
- 前端使用原生 HTML、CSS 和 JavaScript
- 後端使用 Google Calendar API

## 注意事項

- 建立的事件會包含 `[AutoEventCreator]` 標記
- 刪除功能只會移除帶有此標記的事件
- 事件會在週一至週五全天建立

## 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](./License.txt) 檔案

