// see https://warpspire.com/posts/taste
// also see https://ben.balter.com/2015/08/12/the-zen-of-github/
const zenurl = "https://api.github.com/zen";
const quotes = JSON.parse(localStorage.getItem('quotes')) || [];

async function initialise() {
  await harvestQuotes(10);
  console.log(quotes.length);
  console.log(quotes);
  articles = quotes.map(buildQuote);
  articles.forEach(a => zen.appendChild(a));
}

async function harvestQuotes(n) {
  while(quotes.length < n) {
    console.log(`${quotes.length} quotes < ${n}`);
    quote = await getQuote();
    saveQuote(quote);
  }
  console.log(`got ${quotes.length} quotes`);
}

async function getQuote() {
  console.log("requesting quote");
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

function slide() {
  const first = document.querySelector('#zen article:first-child');
  if(first) {
    zen.appendChild(first);
  }
}

initialise();

download.addEventListener('click', modalQuote);
modal.addEventListener('click', ev => modal.classList.remove('visible'));

async function modalQuote() {
  quote = await getQuote();
  modalContent.textContent = quote;
  modal.classList.toggle('visible');
}


function randomiseHue() {
  document.documentElement.style.setProperty('--hue', Math.floor(Math.random() * 360));
}

hueBtn.addEventListener('click', randomiseHue);
nextBtn.addEventListener('click', slide);
