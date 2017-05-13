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
      case actions.PLAY_AGAIN:
        return {
          ...state,
          score: 0,
          questionScore: 0,
          submitCount: 0
        }
      case actions.GET_QUESTIONS_SUCCESS:
        return {
          ...state,
          questions: action.questions,
          currentQuestion: action.questions[0]
        }
      case actions.CHECK_LOGIN_SUCCESS:
        return {
          ...state,
          currentUser: action.currentUser
        }
      case actions.LOGOUT:
        return {
          ...state,
          currentUser: null
        }
      case actions.CHECK_ANSWER_SUCCESS:
        if(action.questionScore === 1) {
          return {
            ...state,
            questionScore: action.questionScore,
            score: state.score + 1,
            submitCount: state.submitCount + 1,
            currentQuestion: state.questions[state.submitCount]
          }
        }
        return {
          ...state,
          questionScore: action.questionScore,
          score: state.score,
          submitCount: state.submitCount + 1,
          currentQuestion: state.questions[state.submitCount]
        }
      case actions.RELOAD_QUESTION:
        return {
          ...state,
          questionScore: action.questionScore
        }
  }
  return state;
}
