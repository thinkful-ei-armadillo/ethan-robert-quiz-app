'use strict';

console.log('app loaded');

const questions = [

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
