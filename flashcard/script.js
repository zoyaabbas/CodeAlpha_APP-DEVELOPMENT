let flashcards = [
  {
    question: "What is HTML?",
    answer: "HTML stands for HyperText Markup Language.",
  },
  {
    question: "What is CSS?",
    answer: "CSS is used to style and design web pages.",
  },
  {
    question: "What is JavaScript?",
    answer:
      "JavaScript is a programming language used to make websites interactive.",
  },
];

let currentCard = 0;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const cardNumberElement = document.getElementById("cardNumber");

const showAnswerBtn = document.getElementById("showAnswerBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

function displayCard() {
  questionElement.textContent = flashcards[currentCard].question;
  answerElement.textContent = flashcards[currentCard].answer;

  answerElement.classList.add("hidden");

  showAnswerBtn.textContent = "Show Answer";

  cardNumberElement.textContent = `${currentCard + 1} / ${flashcards.length}`;
}

showAnswerBtn.addEventListener("click", function () {
  answerElement.classList.toggle("hidden");

  if (answerElement.classList.contains("hidden")) {
    showAnswerBtn.textContent = "Show Answer";
  } else {
    showAnswerBtn.textContent = "Hide Answer";
  }
});

nextBtn.addEventListener("click", function () {
  if (currentCard < flashcards.length - 1) {
    currentCard++;
  } else {
    currentCard = 0;
  }

  displayCard();
});

previousBtn.addEventListener("click", function () {
  if (currentCard > 0) {
    currentCard--;
  } else {
    currentCard = flashcards.length - 1;
  }

  displayCard();
});

addBtn.addEventListener("click", function () {
  let question = prompt("Enter your question:");
  let answer = prompt("Enter the answer:");

  if (question && answer) {
    flashcards.push({
      question: question,
      answer: answer,
    });

    currentCard = flashcards.length - 1;

    displayCard();
  }
});

editBtn.addEventListener("click", function () {
  let question = prompt("Edit question:", flashcards[currentCard].question);

  let answer = prompt("Edit answer:", flashcards[currentCard].answer);

  if (question && answer) {
    flashcards[currentCard].question = question;
    flashcards[currentCard].answer = answer;

    displayCard();
  }
});

deleteBtn.addEventListener("click", function () {
  if (flashcards.length === 1) {
    alert("You must have at least one flashcard.");
    return;
  }

  let confirmation = confirm("Are you sure you want to delete this flashcard?");

  if (confirmation) {
    flashcards.splice(currentCard, 1);

    if (currentCard >= flashcards.length) {
      currentCard = flashcards.length - 1;
    }

    displayCard();
  }
});

displayCard();
