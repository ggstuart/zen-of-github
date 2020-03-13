// see https://warpspire.com/posts/taste
// also see https://ben.balter.com/2015/08/12/the-zen-of-github/
const zenurl = "https://api.github.com/zen";
const quotes = JSON.parse(localStorage.getItem('quotes')) || [];

async function initialise() {
  await harvestQuotes(7);
  articles = quotes.map(buildQuote);
  articles.forEach(a => zen.appendChild(a));
}

async function harvestQuotes(n) {
  while(quotes.length < n) {
    quote = await getQuote();
    saveQuote(quote);
  }
}

async function getQuote() {
  response = await fetch(zenurl);
  return response.text();
}

function saveQuote(quote) {
  if(!quotes.includes(quote)) {
    quotes.push(quote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
}

function buildQuote(quote) {
  const article = document.createElement('article');
  article.textContent = quote;
  return article;
}

function rotate() {
  const first = document.querySelector('#zen article:first-child');
  if(first) {
    zen.appendChild(first);
  }
}

async function modalQuote() {
  quote = await getQuote();
  saveQuote(quote);
  modalContent.textContent = quote;
  modal.classList.toggle('visible');
}

function randomiseHue() {
  document.documentElement.style.setProperty('--hue', Math.floor(Math.random() * 360));
}

initialise();
modal.addEventListener('click', ev => modal.classList.remove('visible'));
hueBtn.addEventListener('click', randomiseHue);
rotateBtn.addEventListener('click', rotate);
download.addEventListener('click', modalQuote);
