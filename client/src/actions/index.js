import * as Cookies from 'js-cookie';

export const SUBMIT_ANSWER = "SUBMIT_ANSWER";
export const submitAnswer = (receiveAnswer) => ({
  type: SUBMIT_ANSWER,
  receiveAnswer,
})

export const GET_QUESTIONS_SUCCESS = "GET_QUESTIONS_SUCCESS";
export const getQuestionsSuccess = (questions) => ({
  type: GET_QUESTIONS_SUCCESS,
  questions: questions,
})

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const getQuestions = () => {
  return (dispatch) => {
    const accessToken = Cookies.get('accessToken');
    fetch('/api/questions', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }).then(questions => {
      dispatch(getQuestionsSuccess(questions));
    }

    );
  }
}
