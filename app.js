'use strict';

console.log('app loaded');

const questionPool = [

  {
    prompt: "What musical instrument does Lisa Simpson play?",
    choices: [
      'Trombone',
      'Saxophone',
      'Piano',
      'Clarinet',
    ],
    answer: 1,
  },
  {
    prompt: "What is Ned Flanders' wife's name",
    choices: [
      'Ruth',
      'Edna',
      'Maude',
      'Marge',
    ],
    answer: 2,
  },
  {
    prompt: "What is the name of Bart's best friend?",
    choices: [
      'Jimbo',
      'Milhouse',
      'Otto',
      'Karl',
    ],
    answer: 1,
  },
  {
    prompt: "What is Springfield's neighboring rival town called?",
    choices: [
      'Shelbyville',
      'Greensville',
      'Poolville',
      'Dirksville',
    ],
    answer: 0,
  },
  {
    prompt: "Which of the following movies does Troy McClure NOT star in?",
    choices: [
      'Alice the Groovy Mule',
      'Calling all Quakers',
      'The Decapitation of Larry Leadfoot',
      'Dig your own Grave and Save',
    ],
    answer: 1,
  },
  {
    prompt: "Who founded the town of Springfield?",
    choices: [
      'Zechariah Springfield',
      'Nebuchadnezzar Springfield',
      'Jebediah Springfield',
      'Isaac Springfield',
    ],
    answer: 2,
  },
  {
    prompt: "Who sold the Monorail to Springfield ?",
    choices: [
      'Gordon Gains',
      'Lionel Hutz',
      'Mr. Burns',
      'Lyle Lanely',
    ],
    answer: 3,
  },
  {
    prompt: "What is Marge Simpson's maiden name?",
    choices: [
      'Carlson',
      'Bouvier',
      'Treado',
      'Burns',
    ],
    answer: 1,
  },
  {
    prompt: "On what street do the Simpsons live?",
    choices: [
      'Evergreen Terrace',
      'St. Springfield Lane',
      'Maplewood Crest',
      'Soundbeach Ave',
    ],
    answer: 0,
  },
  {
    prompt: "What was the secret ingredient in a Flaming Moe?",
    choices: [
      'Bleach',
      'Cough Syrup',
      'Denture Cleaner',
      'Shampoo',
    ],
    answer: 1,
  },
];


const state = {

  // Number of questions to ask per quiz
  questionCount: 5,

  questionIDs: [ 0, 1, 2, 3, 4,],

  // Which "page" to display
  page: 'intro',

  // Which question to ask (an index of questions array)
  // questionID: null,

  // Which choice the user selected (an index of questions[questionID].choices)
  userAnswer: null,

  // Number of correct answer made so far
  score: 0,

  // Number of questions asked in this quiz  so far
  questionCounter: 0,
};


console.log(state);

const attachEventHandlers = function () {
  // attach all event handlers to body, use event delegation

  const body = $('body');

  body.on('submit', 'form#intro-form', (e) => {
    e.preventDefault();
    state.page = 'question';
    state.questionCounter++;
    render();
  });

  body.on('submit', 'form#question-form', (e) => {
    e.preventDefault();
    const userAnswer = parseInt($('input[name=userAnswer]:checked').val(), 10);
    state.userAnswer = userAnswer;
    console.log(userAnswer, questionPool[state.questionIDs[state.questionCounter]].answer - 1);
    if (userAnswer === questionPool[state.questionIDs[state.questionCounter]].answer-1) {
      state.score++;
      console.log('correct!');
    }

    if (state.questionCount === state.questionCounter) {
      state.page = 'results'
    }
    else {
      state.questionCounter++;
    }

    render();
  });

  body.on('submit', 'form#results', (e) => {
    e.preventDefault();
    // set page back to intro
    // re-generate questionIDs array
    // set userAnswer: null,
    // set score: 0,
    // set questionCounter: 0,
    render();
  });

};

const render = function () {

  let page = '';

  // look at state

  // switch looking at state.page

  switch(state.page){
    case 'question':
      page = renderQuestionPage(state.questionIDs[state.questionCounter-1], state.userAnswer);
      break;
    case 'results':
      page = renderResultsPage();
      break;
    case 'intro':
    default:
      page = renderIntroPage();
      break;
  }

  $('body').html(page);
};

const renderIntroPage = function () {

  // return html for page
  return `
    <main class='intro-page'>
    <h1>Welcome to the Lorem Quiz</h1>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    
    <form id = 'intro-form'>
      <label for="quiz-start"></label>
      <button name='quiz-start' id='quiz-start' type='submit'>Start</button>
    </form>

  </main>`;
};

const renderQuestionPage = function (questionNum, userAnswer) {

  const question = questionPool[state.questionIDs[state.questionCounter-1]];
  
  return `
    <main id="question-page" >

      <h1 id="quiz-title">Quiz App</h1>



        <ul id="quiz-status">
          <li>Question: ${state.questionCounter}/${state.questionCount}</li>
          <li>Score: ${state.score}/${state.questionCount}</li>
        </ul>

        <div>

          <h2 id="prompt">${question.prompt}</h2>

          <form id="question-form">

            <input type="radio" id="A" name="userAnswer" value="0">
              <label for="A">${question.choices[0]}</label>

              <br /> <!-- DO with CSS -->
      
        <input type="radio" id="B" name="userAnswer" value="1">
                <label for="B">${question.choices[1]}</label>

                <br /> <!-- DO with CSS -->
        
        <input type="radio" id="C" name="userAnswer" value="2">
                  <label for="C">${question.choices[2]}</label>

                  <br /> <!-- DO with CSS -->
          
        <input type="radio" id="D" name="userAnswer" value="3">
                    <label for="D">${question.choices[3]}</label>

                    <br /><br /> <!-- DO with CSS -->
            
        <button type="submit">Submit Answer</button>
      </form>
    </div>
  </main>`;
};

const renderResultsPage = function () {

  // return html for page
  return 'results page';
};

const main = function () {

  // generate

  attachEventHandlers();
  render();
};

$(main);
