const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: "Atmospheric pressure is important in the process of:",
        choice1: "Breathing",
        choice2: "Reproduction",
        choice3: "Blood flow",
        choice4: "Micturition",
        answer: 1
    },
    {
        question: "What type of diabetes mellitus will someone have due to a faulty signal transmission",
        choice1: "Type II DM",
        choice2: "Type II and III DM",
        choice3: "Type II and I DM",
        choice4: "Type I DM",
        answer: 1
    },
    {
        question: "What class of hormones do thyroid hormones fall into?",
        choice1: "Steroid hormones",
        choice2: "Eikosanoid hormones",
        choice3: "Peptide hormones",
        choice4: "Amines",
        answer: 4
    },
    {
        question: "What will cut off Thyrotropin-Releasing Hormone release",
        choice1: "Decrease in blood volume",
        choice2: "Decrease in body temp",
        choice3: "Increase in blood pressure",
        choice4: "Increase in body temp",
        answer: 4
    },
    {
        question: "Water handling by the kidney (% reabsorption)",
        choice1: "93%",
        choice2: "94%",
        choice3: "99.4%",
        choice4: "99%",
        answer: 3
    },
    {
        question: "Which circulation has predominant metabolic control?",
        choice1: "Renal",
        choice2: "Liver",
        choice3: "Lung",
        choice4: "Splanchnic",
        answer: 4
    },
    {
        question: "The normal temperature of human body on the Kelvin scale is",
        choice1: "280",
        choice2: "290",
        choice3: "310",
        choice4: "300",
        answer: 3
    },
    {
        question: "The saliva helps in the digestion of",
        choice1: "Proteins",
        choice2: "starch",
        choice3: "Fibers",
        choice4: "fats",
        answer: 2
    },
    {
        question: "Which of the following is essential for blood clotting?",
        choice1: "RBC",
        choice2: "WBC",
        choice3: "Blood Platelets",
        choice4: "Lymph",
        answer: 3
    },
    {
        question: "A 18 year old cat comes in with clinical signs of tachycardia, diarrhea, and weight loss, everything seems to be stimulate - based on our knowledge what can we assume this cat has",
        choice1: "Hyperglycemic",
        choice2: "Hyperthyroidism",
        choice3: "Hypoglycemic",
        choice4: "Hypothyroidism",
        answer: 3
    }
];

//CONSTANTS
const Correct_Bonus = 2;
const Max_questions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.lenght === 0 || questionCounter >= Max_questions) {
        localStorage.setItem("mostRecentScore", score);
        // go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${Max_questions}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedchoice = e.target;
        const selectedAnswer = selectedchoice.dataset["number"];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "Incorrect";

        if (classToApply === "correct") {
            incrementScore(Correct_Bonus);
        }

        selectedchoice.parentElement.classlist.add(classToApply);

        setTimeout(() => {
            selectedchoice.parentElement.classlist.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
startGame();