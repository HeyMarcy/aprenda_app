
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as Cookies from 'js-cookie';
import { getQuestions, checkLogin } from '../actions/index';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentDidMount() {
      this.props.dispatch(getQuestions())
    }
    onSubmit(e) {
      e.preventDefault();
      let answer= this.refs.answer.value;
      console.log(answer);
    }

    logout(e) {
      Cookies.remove('accessToken');
      browserHistory.replace('/login');
    }

    render() {

        return (
            <div className="question-list">
                {this.props.currentQuestion}
                <form onSubmit={this.onSubmit}>
                <input type="text" ref="answer"/>
                <button type="submit">submit</button>
                </form>
                <button type="submit" onClick ={this.logout}>Logout</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
  currentQuestion: state.currentQuestion
})

export default connect(mapStateToProps)(QuestionPage);
