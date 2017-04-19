import * as actions from '../actions/index';

const initialState = {
  questions: [],
  currentQuestion: null,
  score: null,
  currentUser: null,
};


export default (state=initialState, action) => {
  switch (action.type) {
      case actions.GET_QUESTIONS_SUCCESS:
        console.log('action GET_QUESTIONS_SUCCESS')
        return { ...state,
            questions: action.questions,
            currentQuestion: action.questions[0]
        }
        case actions.CHECK_LOGIN_SUCCESS:
          return { ...state,
              currentUser: action.currentUser,
          }
  }
  return state;
}


//  import { reducer } from './reducers/index';
