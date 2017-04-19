
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as Cookies from 'js-cookie';
import { getQuestions, checkLogin, logout, submitCorrectAnswer, submitWrongAnswer } from '../actions/index';

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
      let answer= this.refs.answer.value;
      let response = this.props.currentQuestion.english;

    }

    logOut(e){
      this.props.dispatch(logout())
    }
    // 
    // submitAnswer(answer, response) {
    //   if(answer === response) {
    //     this.props.dispatch(submitCorrectAnswer());
    //   }
    //   if(answer === '') console.log('write your answer!');
    //   if(answer !== response && answer !== '') console.log('try again');
    // }


    render() {
      console.log(this.props.currentQuestion.english);
        return (
            <div className="question-list">
                {this.props.currentQuestion.portuguese}
                <form onSubmit={this.onSubmit}>
                <input type="text" ref="answer"/>
                <button type="submit">submit</button>
                </form>
                <button onClick={this.logOut}>Logout</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
  currentQuestion: state.currentQuestion,
  score: state.score,
  questions: state.questions
})

export default connect(mapStateToProps)(QuestionPage);
