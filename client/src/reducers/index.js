import * as actions from '../actions/index';

const initialState = {
  questions: [],
  currentQuestion: {},
  score: 0,
  currentUser: null,
  questionScore: 0,
  submitCount: 0
};


export default (state=initialState, action) => {
  switch (action.type) {
      case actions.GET_QUESTIONS_SUCCESS:
        return { ...state, questions: action.questions, currentQuestion: action.questions[0]}
      case actions.CHECK_LOGIN_SUCCESS:
        return { ...state, currentUser: action.currentUser}
      case actions.LOGOUT:
        console.log('LOGOUT')
        return {...state, currentUser: null}
      case actions.CHECK_ANSWER_SUCCESS:
        let score = state.score;
        if(action.questionScore === 1) {
          score++;
        }
        return {...state, questionScore: action.questionScore, score: score,
                  submitCount: ++state.submitCount, currentQuestion: state.questions[state.submitCount]}
      case actions.RELOAD_QUESTION:
        return {...state, questionScore: action.questionScore}
  }
  return state;
}


//  import { reducer } from './reducers/index';
