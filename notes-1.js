'use strict';

// never modify just read from it
const questions = [

  {
    prompt: 'What is ......',
    choices: [
      'alpha',
      'bravo',
      'charlie',
      'delta',
    ],
    correctIndex: 2,
  },

  // .... 9 more
];

// at quiz atart generat array of uniq array indexes

const state = {
  page: 'intro',
  questionID: null,     // an index into questions for questions page
  userAnswer: 1,        // index for radio buttons
  score: 0,             // number of correct answers so far
  questionCount: 5,     // num of question to be asked in one quiz
  questionCounter: 0,
};


// Intro Page

const state = {
  page: 'intro',
  questionID: null,     // an index into questions for questions page
  userAnswer: null,     // index for radio buttons
  score: 0,             // number of correct answers so far
  questionCount: 5,     // num of question to be asked in one quiz
  questionCounter: 0,
};

// Question 1
// display question for user to answer
const state = {
  page: 'question',
  questionID: 2,     // random num from 0 - question.length-1
  userAnswer: null,     // index for radio buttons
  score: 0,             // number of correct answers so far
  questionCount: 5,     // num of question to be asked in one quiz
  questionCounter: 1,
};

// Question Answer 1
// display question result (success or failure), highlight user answer and correct answer
const state = {
  page: 'question',
  questionID: 2,     // random num from 0 - question.length-1
  userAnswer: 3,     // index for radio buttons
  score: 0,             // number of correct answers so far
  questionCount: 5,     // num of question to be asked in one quiz
  questionCounter: 1,
};

// ...

// Results

const state = {
  page: 'results',
  questionID: null,     // random num from 0 - question.length-1
  userAnswer: null,     // index for radio buttons
  score: 3,             // number of correct answers so far
  questionCount: 5,     // num of question to be asked in one quiz
  questionCounter: 5,
};
