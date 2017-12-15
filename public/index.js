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
    const table = document.querySelector('#ai-articles');
    const headerRow = document.createElement('tr');
    const header = document.createElement('td');
    header.innerHTML = `<h2>${article.title}</h2>`;
    headerRow.appendChild(header);
    const descriptionRow = document.createElement('tr');
    const description = document.createElement('td');
    description.innerText = article.description;
    descriptionRow.appendChild(description);
    table.appendChild(headerRow);
    table.appendChild(descriptionRow);

  })
}

document.addEventListener('DOMContentLoaded', app);
