# Next redux-toolkit-persist example
 
## Link
[Demo](https://codesandbox.io/s/next-example-redux-toolkit-persist-zhv8f)

## Suggestion

個人試過幾次 redux 跟 nextjs的結合 我發現並不太好配置有些項目必須考慮進去
- localstorage
- cookies
- sync-browser-tabs 

我一直找不到最佳解，後來就不在專案內採用redux了
react原生的context 在搭配不同的 hook 結合的provider pattern是我目前覺得的最佳設計
