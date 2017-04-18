import * as actions from '../actions/index';

const initialState = {
  questions: [],
  currentQuestion: null,
  score: null,
  user: null,
};


export default (state=initialState, action) => {
  switch (action.type) {
      case actions.GET_QUESTIONS_SUCCESS:
        console.log('action GET_QUESTIONS_SUCCESS')
        return { ...state,
            questions: action.questions,
        }
        break;
  }
  return state;
}


//  import { reducer } from './reducers/index';
