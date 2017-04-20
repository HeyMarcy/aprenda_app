
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as Cookies from 'js-cookie';
import { getQuestions, checkLogin, logout, submitCorrectAnswer, checkAnswerSuccess, submitWrongAnswer, checkAnswer } from '../actions/index';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
        this.logOut=this.logOut.bind(this);
    }

    componentDidMount() {
      this.props.dispatch(getQuestions())
    }
    onSubmit(e) {
      e.preventDefault();
      let userInput= this.refs.answer.value;
      let questionId = this.props.currentQuestion._id;
      let questionScore;
      console.log('question id?', questionId);
      if(userInput === this.props.currentQuestion.english){
        this.props.dispatch(checkAnswer(1, questionId))
      } else {
        this.props.dispatch(checkAnswer(-1, questionId))
      }
    }

    logOut(e){
      this.props.dispatch(logout())
    }

    render() {
        if(this.props.currentQuestion){
          return (
              <div className="question-list">
                  {this.props.currentQuestion.portuguese}
                  <form onSubmit={this.onSubmit}>
                  <input type="text" ref="answer"/>
                  <button type="submit">submit</button>
                  </form>
                  <button onClick={this.logOut}>Logout</button>
              </div>
          )
        } else {
          return (
            <div> No CurrentQuestion </div>
          )
        };
    }
}

const mapStateToProps = (state, props) => ({
  currentQuestion: state.currentQuestion,
  score: state.score,
  questions: state.questions,
  questionScore: state.questionScore
})

export default connect(mapStateToProps)(QuestionPage);
