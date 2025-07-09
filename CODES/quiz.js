const questions = [
    {
        type: "single",
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: "Mars"
    },
    {
        type: "multiple",
        question: "Select all programming languages:",
        answers: ["HTML", "Python", "CSS", "JavaScript"],
        correct: ["Python", "JavaScript"]
    },
    {
        type: "fill",
        question: "______ is the capital of France.",
        correct: "Paris"
    },
    {
        type: "single",
        question: "Who wrote 'Harry Potter'?",
        answers: ["J.K. Rowling", "Elon Musk", "Shakespeare", "Mark Twain"],
        correct: "J.K. Rowling"
    },
    {
        type: "fill",
        question: "To display output in javascript  ______ is used.",
        correct: "console.log"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answerBtns = document.getElementById("BUTTONS");
const nextBtn = document.getElementById("nextbtn");

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function resetState() {
    nextBtn.style.display = "none";
    answerBtns.innerHTML = "";
    answered = false;
}

function showQuestion() {
    resetState();
    const q = questions[currentQuestion];
    questionEl.innerHTML = `<h2>${q.question}</h2>`;

    if (q.type === "single" || q.type === "multiple") {
        q.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer;
            button.classList.add("ans");
            button.addEventListener("click", () => handleSelection(button, q));
            answerBtns.appendChild(button);
        });
    } else if (q.type === "fill") {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Type your answer here";
        input.classList.add("ans");
        input.style.width = "100%";
        input.id = "fillInput";
        answerBtns.appendChild(input);

        const submit = document.createElement("button");
        submit.innerText = "Submit";
        submit.classList.add("ans");
        submit.addEventListener("click", () => checkFillAnswer(input, q));
        answerBtns.appendChild(submit);
    }
}

function handleSelection(button, q) {
    if (q.type === "multiple") {
        button.classList.toggle("selected");

       
        if (button.classList.contains("selected")) {
            button.style.backgroundColor = "#d0d0ff";
        } else {
            button.style.backgroundColor = ""; 
        }

       
        const anySelected = document.querySelectorAll(".selected").length > 0;
        if (anySelected) {
            nextBtn.style.display = "block";
            answered = true;
        } else {
            nextBtn.style.display = "none";
            answered = false;
        }
    } else {
        if (answered) return;
        const buttons = document.querySelectorAll(".ans");
        buttons.forEach(btn => btn.disabled = true);

        if (button.innerText === q.correct) {
            button.style.backgroundColor = "#4CAF50";
            score++;
        } else {
            button.style.backgroundColor = "#f44336";
        }
        answered = true;
        nextBtn.style.display = "block";
    }
}


function checkFillAnswer(input, q) {
    if (answered) return;
    const userAns = input.value.trim().toLowerCase();
    const correctAns = q.correct.toLowerCase();

    if (userAns === correctAns) {
        input.style.backgroundColor = "#4CAF50";
        score++;
    } else {
        input.style.backgroundColor = "#f44336";
    }

    input.disabled = true;
    answered = true;
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    const q = questions[currentQuestion];

    if (!answered && q.type !== "multiple") return;

    if (q.type === "multiple") {
        const selected = Array.from(document.querySelectorAll(".selected")).map(btn => btn.innerText);
        const correct = q.correct;

        let isCorrect = selected.length === correct.length && selected.every(ans => correct.includes(ans));
        if (isCorrect) score++;

        document.querySelectorAll(".ans").forEach(btn => {
            btn.disabled = true;
            if (correct.includes(btn.innerText)) {
                btn.style.backgroundColor = "#4CAF50";
            } else if (selected.includes(btn.innerText)) {
                btn.style.backgroundColor = "#f44336";
            }
        });

        if (!answered) {
            answered = true;
            nextBtn.style.display = "block";
            return;
        }
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionEl.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score} / ${questions.length}</p>`;
    nextBtn.innerText = "Restart";
    nextBtn.style.display = "block";
    nextBtn.onclick = startQuiz;
}

startQuiz();
