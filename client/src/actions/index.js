// const START_QUIZ = "START_QUIZ";
// const startQuiz = () => {
//   type: START_QUIZ,
//
// }

const SUBMIT_ANSWER = "SUBMIT_ANSWER";
const submitAnswer = (receiveAnswer) => {
  type: SUBMIT_ANSWER,
  receiveAnswer: receiveAnswer,
}

const GET_QUESTIONS = 'GET_QUESTIONS';
const getQuestions = () => {
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

const GET_QUESTIONS_SUCCESS = "GET_QUESTIONS_SUCCESS";
const getQuestionsSuccess = (questions) => {
  type: GET_QUESTIONS_SUCCESS,
  questions: questions,
}
