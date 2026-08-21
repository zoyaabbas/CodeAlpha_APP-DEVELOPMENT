const quotes = [
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Success is not final, failure is not fatal.",
    author: "Winston Churchill",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Great things are done by a series of small things brought together.",
    author: "Vincent van Gogh",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
];

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("newQuoteBtn");
const copyQuoteButton = document.getElementById("copyQuoteBtn");

let currentQuoteIndex = -1;

function showRandomQuote() {
  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === currentQuoteIndex);

  currentQuoteIndex = randomIndex;

  quoteElement.style.opacity = "0";
  authorElement.style.opacity = "0";

  setTimeout(() => {
    quoteElement.textContent = `"${quotes[randomIndex].text}"`;
    authorElement.textContent = `— ${quotes[randomIndex].author}`;

    quoteElement.style.opacity = "1";
    authorElement.style.opacity = "1";
  }, 300);
}
newQuoteButton.addEventListener("click", showRandomQuote);
showRandomQuote();

copyQuoteButton.addEventListener("click", function () {
  const quote = quoteElement.textContent;
  const author = authorElement.textContent;

  navigator.clipboard.writeText(`${quote} ${author}`);

  alert("Quote copied!");
});
