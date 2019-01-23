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
  body.on('submit', 'form#intro-form', (e) => {

    e.preventDefault();

    state.page = 'question';

    render();
  });

  // Handle question page submission
  body.on('submit', 'form#question-form', (e) => {

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
  body.on('submit', 'form#answer-form', (e) => {

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
  body.on('submit', 'form#results-form', (e) => {

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
    page = renderIntroPage();
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

  return `
    <main class='intro-page'>
    <h1>Welcome to the Lorem Quiz</h1>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

    <form id='intro-form'>
      <label for="quiz-start"></label>
      <button name='quiz-start' id='quiz-start' type='submit'>Start</button>
    </form>

  </main>`;
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

  return `
    <main id="question-page" >

      <h1 id="quiz-title">Quiz App</h1>

      <ul id="quiz-status">
        <li>Question: ${questionNum}/${totalQuestions}</li>
        <li>Score: ${score}/${totalQuestions}</li>
      </ul>

      <div>

        <h2 id="prompt">${question.prompt}</h2>

        <form id="question-form">

          <!-- -->

          <label for="A">
            <input type="radio" id="A" name="userAnswer" value="0">
            ${question.choices[0]}
          </label>

          <label for="B">
            <input type="radio" id="B" name="userAnswer" value="1">
            ${question.choices[1]}
          </label>

          <label for="C">
            <input type="radio" id="C" name="userAnswer" value="2">
            ${question.choices[2]}
          </label>

          <label for="D">
            <input type="radio" id="D" name="userAnswer" value="3">
            ${question.choices[3]}
          </label>

        <button type="submit">Submit Answer</button>
      </form>
    </div>
  </main>`;
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

  const questionNum = questionIndex + 1;
  const totalQuestions = state.questions.length;

  // Count correctly answered questions
  const score = state.questions.filter((q) => {
    return q.userAnswer === q.correctAnswer;
  }).length;

  const question = state.questions[questionIndex];

  const classes = ['','','',''];

  if (question.userAnswer === question.correctAnswer) {
    classes[question.correctAnswer] = 'class="correct"';
  } else {
    classes[question.userAnswer] = 'class="wrong"';
    classes[question.correctAnswer] = 'class="correct"';
  }

  return `
    <main id="question-page" >

      <h1 id="quiz-title">Quiz App</h1>

      <ul id="quiz-status">
        <li>Question: ${questionNum}/${totalQuestions}</li>
        <li>Score: ${score}/${totalQuestions}</li>
      </ul>

      <div>

        <h2 id="prompt">${question.prompt}</h2>

        <form id="answer-form">

          <label for="A" ${classes[0]}>
            <input type="radio" id="A" name="userAnswer" value="0">
            ${question.choices[0]}
          </label>

          <label for="B" ${classes[1]}>
            <input type="radio" id="B" name="userAnswer" value="1">
            ${question.choices[1]}
          </label>

          <label for="C" ${classes[2]}>
            <input type="radio" id="C" name="userAnswer" value="2">
            ${question.choices[2]}
          </label>

          <label for="D" ${classes[3]}>
            <input type="radio" id="D" name="userAnswer" value="3">
            ${question.choices[3]}
          </label>

        <button type="submit">Continue</button>
      </form>
    </div>
  </main>`;
};

const renderResultsPage = function () {

  const totalQuestions = state.questions.length;

  // Count correctly answered questions
  const score = state.questions.filter((q) => {
    return q.userAnswer === q.correctAnswer;
  }).length;

  return `
    <main class='results-page'>
    <h1>Results</h1>

    <p>Total Score: ${score}/${totalQuestions}</p>

    <form id ='results-form'>
      <label for="quiz-start">Try again?</label>
      <button name='quiz-start' id='quiz-start' type='submit'>Start</button>
    </form>

  </main>`;
};

$(main);
