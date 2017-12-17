const responseUrl = "https://newsapi.org/v2/everything?q=javascript&sortBy=popularity&apiKey=6f80860ee9974d0d8301b6bce7fa9e8d";
let articles = [];

const app = function(){
  makeRequest(responseUrl, onResponse);

}

const makeRequest = function (responseUrl, onResponse) {
  const request = new XMLHttpRequest();
  request.open('GET', responseUrl);
  request.addEventListener('load', onResponse);
  request.send();
}

const onResponse = function() {
    if (this.status !== 200) return;
    let jsonString = this.responseText;
    let response = JSON.parse(jsonString);
    articles = response.articles;
    const searchButton = document.querySelector("#search-go");
    const searchInput = document.querySelector("#search-box");
    searchButton.addEventListener('click', handleButtonClick);
    searchInput.addEventListener('keyup', enterKeyListener);
    render(articles);
}

const handleButtonClick = function() {
  const searchInput = document.querySelector("#search-box");
  const searchTerm = searchInput.value;
  console.log('clicked');
  console.log(searchTerm);
  if (searchTerm === "") return;
  const url = newSearchUrl(searchTerm);
  makeRequest(url, onResponse);
  searchInput.value = "";
}

const enterKeyListener = function(event) {
  const searchButton = document.querySelector('#search-go')
  if (event.keyCode == 13) {
    searchButton.click();
  }
}

const newSearchUrl = function(searchTerm) {
  return "https://newsapi.org/v2/everything?q=" + searchTerm + "&sortBy=popularity&apiKey=6f80860ee9974d0d8301b6bce7fa9e8d";
}

const render = function(articles) {
  const section = document.querySelector('#articles');
  section.innerHTML = "";
  articles.forEach(function(article) {
    const articleBlock = document.createElement('article');
    articleBlock.innerHTML = `<h2> ${article.title} </h2> <img src="${article.urlToImage}" width="240px"> <p> ${article.description} <br> <a href="${article.url}" target="_blank"> Full Article </a>`;

    section.appendChild(articleBlock);

  })
}

document.addEventListener('DOMContentLoaded', app);
