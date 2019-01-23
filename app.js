'use strict';

const questionPool = [
  {
    prompt: "What musical instrument does Lisa Simpson play?",
    choices: [
      'Trombone',
      'Saxophone',
      'Piano',
      'Clarinet',
    ],
    correctAnswer: 1,
    userAnswer: null,
  },
  {
    prompt: "What is Ned Flanders wife's name",
    choices: [
      'Ruth',
      'Edna',
      'Maude',
      'Marge',
    ],
    correctAnswer: 2,
    userAnswer: null,
  },
  {
    prompt: "What is the name of Bart's best friend?",
    choices: [
      'Jimbo',
      'Milhouse',
      'Otto',
      'Karl',
    ],
    correctAnswer: 1,
    userAnswer: null,
  },
  {
    prompt: "What is Springfield's neighboring rival town called?",
    choices: [
      'Shelbyville',
      'Greensville',
      'Poolville',
      'Dirksville',
    ],
    correctAnswer: 0,
    userAnswer: null,
  },
  {
    prompt: "Which of the following movies does Troy McClure NOT star in?",
    choices: [
      'Alice the Groovy Mule',
      'Calling all Quakers',
      'The Decapitation of Larry Leadfoot',
      'Dig your own Grave and Save',
    ],
    correctAnswer: 0,
    userAnswer: null,
  },
  {
    prompt: "Who founded the town of Springfield?",
    choices: [
      'Zechariah Springfield',
      'Nebuchadnezzar Springfield',
      'Jebediah Springfield',
      'Isaac Springfield',
    ],
    correctAnswer: 2,
    userAnswer: null,
  },
  {
    prompt: "Who sold the Monorail to Springfield ?",
    choices: [
      'Gordon Gains',
      'Lionel Hutz',
      'Mr. Burns',
      'Lyle Lanely',
    ],
    correctAnswer: 3,
    userAnswer: null,
  },
  {
    prompt: "What is Marge Simpson's maiden name?",
    choices: [
      'Carlson',
      'Bouvier',
      'Treado',
      'Burns',
    ],
    correctAnswer: 1,
    userAnswer: null,
  },
  {
    prompt: "On what street do the Simpsons live?",
    choices: [
      'Evergreen Terrace',
      'St. Springfield Lane',
      'Maplewood Crest',
      'Soundbeach Ave',
    ],
    correctAnswer: 0,
    userAnswer: null,
  },
  {
    prompt: "What was the secret ingredient in a Flaming Moe?",
    choices: [
      'Bleach',
      'Cough Syrup',
      'Denture Cleaner',
      'Shampoo',
    ],
    correctAnswer: 1,
    userAnswer: null,
  },
];

const state = {};

/**
 * Pick count unique elements from questionPool
 */
const pickQuestions = function (count) {

  const uniqueIndexes = [];

  while (uniqueIndexes.length < count) {
    const r = Math.floor(Math.random() * Math.floor(count));

    if (uniqueIndexes.includes(r) === false) {
      uniqueIndexes.push(r);
    }
  }

  const uniqueQuestions = [];

  uniqueIndexes.forEach((i) => {

    uniqueQuestions.push({
      prompt        : questionPool[i].prompt,
      choices       : questionPool[i].choices.map((choice) => choice),
      correctAnswer : questionPool[i].correctAnswer,
      userAnswer    : questionPool[i].userAnswer,
    });
  });

  return uniqueQuestions;
};

/**
 * Engage!
 */
const main = function () {

  // Set initial state
  state.page = 'intro';
  state.questions = pickQuestions(5);

  attachEventHandlers();
  render();
};

/**
 * Attach all event handlers
 */
const attachEventHandlers = function () {

  const body = $('body');

  // Handle intro page submission
  body.on('submit', 'form#intro', (e) => {

    e.preventDefault();

    state.page = 'question';

    render();
  });

  // Handle question page submission
  body.on('submit', 'form#question', (e) => {

    e.preventDefault();

    // Find index of first un-answered question
    const questionIndex = state.questions.findIndex((q) => {
      return q.userAnswer === null;
    });

    // Get value of selected radio button (as a number)
    const userAnswer = Number.parseInt(
      $('input[name=userAnswer]:checked').val(),
      10
    );

    state.page = 'answer';
    state.questions[questionIndex].userAnswer = userAnswer;

    render();
  });

  // Handle answer page submission
  body.on('submit', 'form#answer', (e) => {

    e.preventDefault();

    // If every question has been answered, we are done
    const done = state.questions.every((q) => {
      return q.userAnswer !== null;
    });

    if (done) {
      state.page = 'results';
    } else {
      state.page = 'question';
    }

    render();
  });

  // Handle results page submission
  body.on('submit', 'form#results', (e) => {

    e.preventDefault();

    state.page = 'question';
    state.questions = pickQuestions(5);

    render();
  });
};

const render = function () {

  let page = '';

  switch (state.page) {

  case 'intro' :
      page = renderQuestionPage();
    break;

  case 'question':
    page = renderQuestionPage();
    break;

  case 'answer':
    page = renderAnswerPage();
    break;

  case 'results':
    page = renderResultsPage();
    break;

  default:
    page = renderIntroPage();
    break;
  }

  $('body').html(page);

  console.log(state);
};

const renderIntroPage = function () {

  const page = `
    <main class='intro-page'>

      <h1>Welcome to the Simpson Quiz Extravaganza</h1>

      <form id='intro'>

        <label for="num-questions">How many questions would you like to answer?</label>

        <select id="num-questions">
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>

        <button id='quiz-start' type='submit'>Start</button>
      </form>

    </main>`;

  return page;
};

const renderQuestionPage = function () {

  // Find first unanswered question
  const questionIndex = state.questions.findIndex((q) => {
    return q.userAnswer === null;
  });

  const questionNum = questionIndex + 1;
  const totalQuestions = state.questions.length;

  // Count correctly answered questions
  const score = state.questions.filter((q) => {
    return q.userAnswer === q.correctAnswer;
  }).length;

  const question = state.questions[questionIndex];

  let page = `<main id="question-page">`;

  page += `
    <ul id="quiz-status">
      <li>Question: ${questionNum}/${totalQuestions}</li>
      <li>

        <label for="progress"></label>
        <progress id="progress" max="${totalQuestions}" value="${questionNum}">
          ${questionNum}/${totalQuestions}
        </progress>

      </li>
      <li>Score: ${score}</li>
    </ul>`;

  page += `<div>`;

  page += `<div class='container'>`;

  page += `<form id="question">`;

  page += `<h2 id="prompt">${question.prompt}</h2>`;

  question.choices.forEach((val, i) => {
    page += `
          <label for="choice-${i}">
            <input type="radio" id="choice-${i}" name="userAnswer" value="${i}">
            ${val}
          </label>`;
  });

  page += `<button type="submit">Submit</button>`;

  page += `</form>`;

  page += `</div>`;

  page += `</div>`;

  page += `</main>`;


  return page;
};

const renderAnswerPage = function () {

  // Get last answered question
  const questionIndex = state.questions.reduce((acc, q, i) => {

    if (q.userAnswer !== null && i > acc) {
      return i;
    } else {
      return acc;
    }
  }, -1);

  const question = state.questions[questionIndex];

  const title = (question.userAnswer === question.correctAnswer) ? "Whoo Hoo!" : "D'oh!";

  let gif;
  if (question.userAnswer === question.correctAnswer) {
    gif = {
      url: '/assets/whoo-hoo.gif',
      alt: '',
    };
  } else {
    gif = {
      url: '/assets/doh.gif',
      alt: ''
    };
  }

  let page = `<main id="answer-page" >`;

  page += `<h1 id="quiz-title">${title}</h1>`;

  page += `<img id="answer-gif" src="${gif.url}" alt="${gif.alt}">`;

  if (question.userAnswer !== question.correctAnswer) {
    page += `<p>You answered <strong>${question.choices[question.userAnswer]}</strong></p>`;
    page += `<p>You should have answered <strong>${question.choices[question.correctAnswer]}</strong></p>`;
  }

  page += `<form id="answer">`;

  page += `<button type="submit">Continue</button>`;

  page += `</form>`;

  page += `</main>`;

  return page;
};

const renderResultsPage = function () {

  const totalQuestions = state.questions.length;

  // Count correctly answered questions
  const score = state.questions.filter((q) => {
    return q.userAnswer === q.correctAnswer;
  }).length;

  let page = `
    <main class='results-page'>
      <h1>Results</h1>

      <p>You scored <strong>${score}</strong> out of <strong>${totalQuestions}</strong></p>
  `;

  page += `<ol>`;
  state.questions.forEach((q) => {

    let wrongAnswer = '';
    if (q.userAnswer !== q.correctAnswer) {
      wrongAnswer = `<p class="wrong">${q.choices[q.userAnswer]}</p>`
    }

    page += `
      <li>
        <p>${q.prompt}</p>
        <p class="correct">${q.choices[q.correctAnswer]}</p>
        ${wrongAnswer}
      </li>
    `;


  });
  page += `</ol>`;

  page += `
    <form id='results'>
      <button id='try-again' type='submit'>Try Again?</button>
    </form>
  `;

  page += `</main>`;

  return page;
};

$(main);
