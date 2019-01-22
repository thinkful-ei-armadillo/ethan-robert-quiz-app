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

  body.on('submit', 'form#intro', (e) => {
    state.page = 'question';
    state.questionCounter++;
    render();
  });

  body.on('submit', 'form#question', (e) => {
    // ask radio button for value, set state.userAnsewr
    // compare userAnswer to right answer
    // if right, increment state.score

    // check question count
      // either, set page to results
      // or increment question counter

    render();
  });

  body.on('submit', 'form#results', (e) => {

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

  // intro
    page = renderIntroPage();
  // question
    page = renderQuestionPage(state.questionID, state.userAnswer);
  // results
    page = renderResultsPage();

  $('body').html(page);
};

const renderIntroPage = function () {

  // return html for page
  return 'intro page';
};

const renderQuestionPage = function (questionNum, userAnswer) {

  // return html for page
  return `question page ${questionNum}, ${userAnswer}`;
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
