import * as Cookies from 'js-cookie';

// export const SUBMIT_CORRECT_ANSWER = "SUBMIT_CORRECT_ANSWER";
// export const submitCorrectAnswer = (score, questions) => ({
//   type: SUBMIT_CORRECT_ANSWER,
//   score: score,
//   questions: score,
// })
//
// export const SUBMIT_WRONG_ANSWER = "SUBMIT_WRONG_ANSWER";
// export const submitWrongAnswer = (score, questions) => ({
//   type: SUBMIT_WRONG_ANSWER,
//   score: score,
//   questions: score,
// })

export const CHECK_LOGIN = "CHECK_LOGIN";
export const checkLogin = () => {
  return (dispatch) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
        fetch('/api/me', {
          headers: {
          'Authorization': `Bearer ${accessToken}`
          }
        }).then(res => {
            if (!res.ok) {
                if (res.status === 401) {
                  // Unauthorized, clear the cookie and go to
                  // the login page
                  Cookies.remove('accessToken');
                  return;
                }
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(currentUser =>
            dispatch(checkLoginSuccess(currentUser))
        );
    }
  }
};

export const CHECK_LOGIN_SUCCESS = "CHECK_LOGIN_SUCCESS";
export const checkLoginSuccess = (currentUser) => ({
  type:CHECK_LOGIN_SUCCESS,
  currentUser
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

export const GET_QUESTIONS_SUCCESS = "GET_QUESTIONS_SUCCESS";
export const getQuestionsSuccess = (questions) => ({
  type: GET_QUESTIONS_SUCCESS,
  questions: questions,
})

export const CHECK_ANSWER = 'CHECK_ANSWER';
export const checkAnswer = (questionScore, question ) => {  //TODO remove 'question' parameter?
  return (dispatch) => {
    const accessToken = Cookies.get('accessToken');
    fetch('/api/answer', {
            headers: {
              "Content-Type": "application/json", // 'Content-Type' added because empty object was recieved.
              'Authorization': `Bearer ${accessToken}`
            },
            method:'POST',
            body: JSON.stringify({questionScore, question}) //changed from 'data' to 'body'//TODO rm 'question'?
        }).then(res => {
        // if (!res.ok) {
        //     throw new Error(res.statusText);          //TODO replace error? Removed for now
        // }
        return res.json();
    }).then(result => {
      console.log("dispatch success")
      dispatch(checkAnswerSuccess(questionScore));
    }
    );
  }
}

export const CHECK_ANSWER_SUCCESS = "CHECK_ANSWER_SUCCESS";
export const checkAnswerSuccess = (questionScore) => ({
  type: CHECK_ANSWER_SUCCESS,
  questionScore
})

export const RELOAD_QUESTION = "RELOAD_QUESTION";
export const reloadQuestion = (questionScore) => ({
  type: RELOAD_QUESTION,
  questionScore
})

export const LOGOUT = "LOGOUT";
export const logout = () => ({
  type:LOGOUT,
})
