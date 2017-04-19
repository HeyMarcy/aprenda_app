import * as actions from '../actions/index';

const initialState = {
  questions: [],
  currentQuestion: {},
  score: 0,
  currentUser: null,
};


export default (state=initialState, action) => {
  switch (action.type) {
      case actions.GET_QUESTIONS_SUCCESS:
        return { ...state, questions: action.questions, currentQuestion: action.questions[0]}
      case actions.CHECK_LOGIN_SUCCESS:
        return { ...state, currentUser: action.currentUser}
      case actions.LOGOUT:
        return {...state, currentUser: null}
      case actions.SUBMIT_CORRECT_ANSWER:
        return{...state, questions: action.questions, score: action.score}
      case actions.SUBMIT_WRONG_ANSWER:
        return{...state, questions: action.questions, score: action.score}
  }
  return state;
}


//  import { reducer } from './reducers/index';
