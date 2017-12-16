const responseUrl = "https://newsapi.org/v2/everything?q=javascript&sortBy=popularity&apiKey=6f80860ee9974d0d8301b6bce7fa9e8d";
let articles = [];

const app = function(){
  makeRequest(responseUrl, function () {
    if (this.status !== 200) return;
    const jsonString = this.responseText;
    const response = JSON.parse(jsonString);
    articles = response.articles;
    render(articles);
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
    const section = document.querySelector('#articles');
    const articleBlock = document.createElement('article');
    articleBlock.innerHTML = `<h2> ${article.title} </h2> <img src="${article.urlToImage}" width="240px"> <p> ${article.description} <br> <a href="${article.url}" target="_blank"> Full Article </a>`;

    section.appendChild(articleBlock);

  })
}

document.addEventListener('DOMContentLoaded', app);
