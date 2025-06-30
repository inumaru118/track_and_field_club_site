// GASのAPI
const API_URL = "https://script.google.com/macros/s/AKfycbycSDlgor2CoyzSlq2dM-9Z-48uZ48DlPTyRL2iasWtPhewrJ0c3EsGsEEv-UDZIGTd/exec";

/**
 * GASでスプレッドシートからお知らせデータを取得する
 */
const getNews = () => {
    fetch(API_URL)
        // レスポンスをJSONで扱えるように変換
        .then(response => response.json())
        .then(res => {
            // オブジェクトを整形
            const formatedNews = res.map(data => {
                return {
                    id: data[0],
                    title: data[1],
                    short_message: data[2],
                    message: data[3],
                    created_at: data[4]
                }
            });
            // HTMLからIDが該当するDOMを取得
            const newsListElement = document.getElementById("newsList");
            newsListElement.innerHTML = '';
            // 取得したお知らせの数、繰り返し処理
            formatedNews.forEach(news => {
                // divの新たなDOMを作成
                const newsItemDiv = document.createElement("div");
                // クラス名にTailwindCSSのユーティリティクラスを付与
                newsItemDiv.className = "border-b pb-4";
                // DOMにHTMLを挿入
                newsItemDiv.innerHTML = `
                    <p class="text-sm text-gray-500">${news.created_at}</p>
                    <a href="##" class="hover:underline cursor-pointer"><h3 class="text-lg font-semibold">${news.title}</h3></a>
                    <p class="text-sm text-gray-700">${news.short_message}</p>
                `;
                // 親の要素にdivタグを追加
                newsListElement.appendChild(newsItemDiv);
            })
        });
}