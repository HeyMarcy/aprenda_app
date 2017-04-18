import (START_QUIZ, SUBMIT_ANSWER) from '../actions/index';

const initialState = {
  questions: [],
  currentQuestion: null,
  score: null,
  user: null,
};


export const reducer = (state=initialState, action) => {
  switch (action.type) {
      case GET_QUESTIONS_SUCCESS:
      console.log('action GET_QUESTIONS_SUCCESS')
        return { ...state, {
            questions: actions.questions,
        }
      }
      break;
  }
  return state;
}
