//array of objects for the geography quiz
const quiz1 = [
    {
       q: 'What is the tallest mountain on Earth?',
       options: ['Mt. Everest', 'Mt. Washington', 'Mt. Fuji'],
       answer: 0
    },
    {
       q: 'Which river flows through the rainforests of Brazil?',
       options: ['Rio Grande', 'Kookabura' ,'Amazon'],
       answer: 2
    },
    {
       q: 'What is the capital city of France?',
       options: ['Riyadh', 'Paris', 'Beijing'],
       answer: 1
    },
    {
       q: 'What country has the largest popularity in the world?',
       options: ['Philippines', 'Malaysia', 'China'],
       answer: 2
    },
    {
       q: 'What is the name of the highest uninterrupted waterfall in the world?',
       options: ['Angel Falls', 'Victoria Falls', 'Niagara Falls'],
       answer: 0
    }
]

const quiz2 = [
    {
       q: 'How many bones are in the human body?',
       options: [200, 168, 206],
       answer: 2
    },
    {
       q: 'What is the study of mushrooms called?',
       options: ['Mycology', 'Shroomology' ,'Micrology'],
       answer: 0
    },
    {
       q: 'What does DNA stand for?',
       options: ['Deoxyribonucleic acid', 'Dinucleic acid', 'Dinitronucleic acid'],
       answer: 0
    },
    {
       q: 'The concept of gravity was discovered by which famous physicist?',
       options: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei'],
       answer: 1
    },
    {
       q: 'Which is the main gas that makes up the Earth’s atmosphere?',
       options: ['Oxygen', 'Hydrogen', 'Nitrogen'],
       answer: 2
    }
]

const quiz3 = [
    {
       q: 'What are a group of crows referred to as?',
       options: ['Flock','Murder', 'Herd'],
       answer: 1
    },
    {
       q: 'The plant parts that take in water and minerals from the soil are?',
       options: ['Leaves', 'Stem' ,'Roots'],
       answer: 2
    },
    {
       q: 'What is the food-making process for plants called?',
       options: ['Photosynthesis', 'Photorespiration', 'Germination'],
       answer: 0
    },
    {
       q: 'What is the scientific name for pigs?',
       options: ['Mus musculus', 'Sus', 'Equus Caballus'],
       answer: 1
    },
    {
       q: 'What is a male zebra called?',
       options: ['Stallion', 'Buck', 'Stag'],
       answer: 0
    }
]

//for adding values to the HTML elements
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const optionContainerLen = optionContainer.children.length;
const progress = document.querySelector(".progress-done");

let progressCounter = 20;
let questionCounter = 0; let currentQuestion; 
let availableQuestions = []; let availableOptions = [];
let score = 0;

//push questions into the 'availableQuestions' array
function setAvailableQuestions(quizArray) {
    const totalQuestions = quizArray.length;
    for(let i = 0; i < totalQuestions; i++) {
        availableQuestions.push(quizArray[i]);
    }
}

//set question number and question options
function getNewQuestions(quizArray) {
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quizArray.length;

    //set question text, get random question from the array of objects
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //gets position of 'questionIndex' in the 'availableQuestions' array and removes it to avoid repetition
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1, 1); 

    //set the options
    const optionLen = currentQuestion.options.length;
    
    for(let i = 0; i < optionLen; i++){
        availableOptions.push(i);
    }

    for(let i = 0; i < optionLen; i++) {
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];

        //gets position of 'optionIndex' in the 'availableQuestions' array and removes it to avoid repitition
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2, 1);
        
        optionContainer.children[i].innerHTML = currentQuestion.options[optionIndex];
        optionContainer.children[i].setAttribute("id", optionIndex);
        optionContainer.children[i].style.animationDelay = '0.2s';
        optionContainer.children[i].setAttribute("onclick", "getResult(this)")
    }
 
    questionCounter++; 
}

//gets the result of current attempt question and computes the score
function getResult(optionElement) {
      const id = parseInt(optionElement.id);
      optionElement.style.color = 'white';   
      optionElement.style.backgroundColor = id === currentQuestion.answer ? 'green' : 'red'; 

      if(id === currentQuestion.answer)
      {
         score++;         
      }  else{
         for(let i = 0; i < optionContainerLen; i++) {
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
              optionContainer.children[i].style.backgroundColor = 'green';
              optionContainer.children[i].style.color = 'white';
            } 
         } 
      }
      
      unclickableOptions();
} 

//disable clicking of buttons once an option is selected
function unclickableOptions() {
   for(let i = 0; i < optionContainerLen; i++) {
      optionContainer.children[i].classList.add("already-answered");
   }
}

//reset the option buttons to the default color  
function reset() {
   for(let i = 0; i < optionContainerLen; i++) {
      optionContainer.children[i].style.backgroundColor = 'rgb(173, 164, 164)';
      optionContainer.children[i].style.color = 'darkslategrey';
      optionContainer.children[i].classList.remove("already-answered");
   }
}

//make changes to progress bar
function setProgress(counter) {
   setTimeout(() => {
      progress.style.width = counter + '%';
      progress.style.opacity = 1;
     }, 100)
}

//when next button is clicked
function next(quizArray) {
    if(questionCounter === quizArray.length) {
      if(progressCounter === 100) {
         document.getElementById("overlay").style.display = "none";
         document.getElementById("overlay2").style.display = "block";
         document.querySelector(".total-score").innerHTML = score;

      const start = () => {
         setTimeout(function(){
             confetti.start();
         }, 1000);
      };
      start();
      }
    }
    else {
        reset();
        progressCounter += 20; setProgress(progressCounter);
        getNewQuestions(quizArray);
    }
}

//overlay properties 
function openForm(quizArray) {
    document.getElementById("overlay").style.display = "block";
    setAvailableQuestions(quizArray); //load quiz questions
    getNewQuestions(quizArray);
    setProgress(20);

    const stop = () => {
      setTimeout(function(){
          confetti.stop();
      }, 1000);
   };
   stop();
}

function resetData(divIDName) {
   document.getElementById(divIDName).style.display = "none";
   availableQuestions = []; availableOptions = [];
   questionCounter = 0; score = 0;  
   progress.style.width = '0%'; progressCounter = 20;
}

//close the quiz form
function closeForm() {
    resetData("overlay");
    reset(); 
}

//close result form
function closeResult() {
    resetData("overlay2");
    reset(); 
}


