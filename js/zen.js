// see https://warpspire.com/posts/taste
// also see https://ben.balter.com/2015/08/12/the-zen-of-github/
const zenurl = "https://api.github.com/zen";

function appendQuote() {
  try {
    fetch(zenurl).then(response => {
      if(response.ok) {
        return response.text();
      } else {
        errorHandler(response);
      }
    }).then(successHandler);
  }
  catch(error) {
    console.log(error);
  }
}

function errorHandler() {
  // the error handler raises exceptions based on the reponse object status
  if (response.status === 403) {
   console.log(response.text());
   throw "403 error! Rate limit reached?";
 } else {
   throw `${reponse.status} ${response.statusText}`
 }
}

// the successHandler processes the quote contained in the successfully fullfilled response
function successHandler(quote) {

  // the data are ratelimited so we use local storage to store unique values
  const quotes = JSON.parse(localStorage.getItem('quotes')) || [];

  // repetition should be filtered out
  if(!quotes.includes(quote)) {
    quotes.push(quote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
}



const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
for(const quote of quotes) {
  addQuote(quote);
}


// this function adds a new quote to the rendered HTML (via the DOM)
// the <section id="zen"> will grow by one <article> each time this is called
function addQuote(quote) {
  // we make an object that represents the HTML, including CSS classes and eventhandlers for a quote
  const quoteObject = buildQuote(quote);
  // we put it into the zen section built from our HTML 'template'
  zen.appendChild(quoteObject);
}

function buildQuote(quote) {
  const article = document.createElement('article');
  article.textContent = quote;
  return article;
}

// successHandler("test")
// successHandler("test")
// successHandler("test")
// successHandler("test")

appendQuote();
appendQuote();
appendQuote();
appendQuote();
