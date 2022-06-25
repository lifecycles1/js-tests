const quizEl = document.getElementById("quiz");
let correctAnswers = 0;
let questionIndex = 0;

fetch("quiz.json")
  .then((response) => response.json())
  .then((quiz) => initQuiz(quiz));

function initQuiz(quiz) {
  quizEl.innerHTML = `
        <div class="first-page">
        <h1>${quiz.quizName}</h1>
        <button id="start">Start Quiz</button>
        </div>
    
    `;

  const startButton = quizEl.querySelector("#start");
  startButton.addEventListener("click", (e) => {
    renderQuestion(questionIndex);
  });

  function renderQuestion(index) {
    const question = quiz.questions[index];
    quizEl.innerHTML = `
        <h2>${question.title}</h2>
        <div class="answers">
            ${question.answers
              .map(
                (ans) =>
                  `<label data-correct="${
                    ans.correct ? "1" : "0"
                  }"><input type="radio" name="question_${question.id}"> ${
                    ans.answer
                  }</label>`
              )
              .join("")}       
        </div>
        <br>
        <button>Next</button>
    `;

    const nextButton = quizEl.querySelector("button");
    nextButton.onclick = (e) => {
      const checked = document.querySelector("input:checked");
      if (!checked) {
        return;
      }

      const label = checked.parentNode;
      const correct = label.dataset.correct == "1";

      if (correct) {
        correctAnswers++;
      }

      questionIndex++;
      console.log(correctAnswers);
      if (questionIndex >= quiz.questions.length) {
        console.log("Display result");
        renderResult();
        return;
      }

      renderQuestion(questionIndex);
    };
  }

  function renderResult() {
    quizEl.innerHTML = `
        <div class="final-page">
        <h2>${quiz.quizName}</h2>
        <p>Your score is <b>${correctAnswers}</b> out of <b>${quiz.questions.length}</b></p>

        <button>Restart Quiz</button>
        </div>
    `;

    const button = quizEl.querySelector("button");
    button.onclick = (e) => {
      questionIndex = 0;
      correctAnswers = 0;
      renderQuestion(questionIndex);
    };
  }
}
