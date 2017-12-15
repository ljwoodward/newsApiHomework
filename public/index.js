const responseUrl = "https://newsapi.org/v2/everything?q=ai&sortBy=publishedAt&apiKey=6f80860ee9974d0d8301b6bce7fa9e8d";
let aiArticles = [];

const app = function(){
  makeRequest(responseUrl, function () {
    if (this.status !== 200) return;
    const jsonString = this.responseText;
    const response = JSON.parse(jsonString);
    aiArticles = response.articles;
    render(aiArticles);
  });
}

const makeRequest = function (responseUrl, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', responseUrl);
  request.addEventListener('load', callback);
  request.send();
}

const render = function(articles) {
  articles.forEach(function(article) {
    const table = document.querySelector('#ai-articles');
    const row = document.createElement('tr');
    const header = document.createElement('td');
    header.innerText = article.title;
    row.appendChild(header);
    table.appendChild(row);
  })
}

document.addEventListener('DOMContentLoaded', app);
