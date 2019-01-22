'use strict';

console.log('app loaded');

const questions = [];

const state = {

  // Number of questions to ask per quiz
  questionCount: 5,

  // Which "page" to display
  page: 'intro',

  // Which question to ask (an index of questions array)
  questionID: null,

  // Which choice the user selected (an index of questions[questionID].choices)
  userAnswer: null,

  // Number of correct answer made so far
  score: 0,

  // Number of questions asked in this quiz  so far
  questionCounter: 0,
};


console.log(state);
