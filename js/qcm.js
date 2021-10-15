
//Récuperation des classes
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer= document.querySelector(".option-container");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");



//Déclaration des variables
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;

// Mettre les questions dans une liste "availableQuestions"
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

//Piocher une question aléatoire dans la liste availableQuestions et l 'ecrire dans le HTML sans redondance:
function getNewQuestion(){   
    //Affichage du numero de la question
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " sur " + quiz.length;
    // prendre une question au hazard de la liste
    const questionIndex = availableQuestions[Math.floor(Math.random()* availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //position de la 'questionIndex' dans la liste
    const index1 = availableQuestions.indexOf(questionIndex);
    //supprimer la question pour ne pas avoir de redondance 
    availableQuestions.splice(index1,1);
     // les options de la question piochée
    const optionLen = currentQuestion.options.length

     // Remplir la liste availableOptions avec les options de la question piochée:
    for(let i=0;i<optionLen;i++){
        availableOptions.push(i) 
    }

    //on vide optionContainer pour ne pas avoir les options de la question précedente
    optionContainer.innerHTML='';

    //Créer en HTML les options de la question
    for (let i=0;i<optionLen;i++){
        //random options
        const optionIndex = availableOptions[Math.floor(Math.random()* availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        //supprimer 'optionIndex' de la liste
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        //pour trouver la bonne réponse
        option.id = i;
        option.className = "option";
        optionContainer.appendChild(option);
        //Ajouter un attribut Onclick gérer par la fonction getResult
        option.setAttribute("onclick","getResult(this)");
     
    }
    
    questionCounter++ 
}

//Afficher les résultat dans le tableau final
function quizResult(){
    
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = quiz.length - correctAnswers;
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / "+ quiz.length;
}

// Fonction permet de calculer les bonnes réponses 
function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        // couleur verte pour une bonne réponse
        element.classList.add("correct");
        correctAnswers++;
        console.log("correct:"+correctAnswers)
    }
    else{element.classList.add("wrong");}
    unclickableOptions();
}

//restriction pour l'utilisateur pour cliquer une seul fois/question
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i =0; i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

//gérer l'affichage des box
function quizOver(){
    // cacher quiBox
    quizBox.classList.add("hide");
    //afficher result box
    resultBox.classList.remove("hide");
    quizResult();
}

//pour le bouton suivant
function next(){
    if(questionCounter === quiz.length){
        console.log("fin du quiz");
        quizOver();
    }
    else{getNewQuestion();}
}

//Refaire le quiz
function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

//Mettre à jour les compteur à 0
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
}

//Démarer le quiz et gérer les box
function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide")

    setAvailableQuestions();
    getNewQuestion();
}

