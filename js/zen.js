// see https://warpspire.com/posts/taste
// also see https://ben.balter.com/2015/08/12/the-zen-of-github/
const zenurl = "https://api.github.com/zen";
const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
const loadingIndicator = document.createElement('div');
loadingIndicator.classList.add('loading');
loadingIndicator.textContent = 'loading...';

async function initialise() {
  articles = quotes.map(buildQuote);
  articles.forEach(a => zen.appendChild(a));
  document.documentElement.appendChild(loadingIndicator);
  await harvestQuotes(8);
  document.documentElement.removeChild(loadingIndicator);
}

async function harvestQuotes(n) {
  while(quotes.length < n) {
    try {
      quote = await getQuote()
      saveQuote(quote);
      zen.appendChild(buildQuote(quote));
    }
    catch(error) {
      showModal(error.message);
      break;
    };
  }
}

async function getQuote() {
  response = await fetch(zenurl);
  if(!response.ok) {
    error = await response.json();
    throw error;
  }
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
  showModal(quote);
}

function showModal(text) {
  modalContent.textContent = text;
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
