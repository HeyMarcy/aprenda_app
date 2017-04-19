
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as Cookies from 'js-cookie';
import { getQuestions, checkLogin, logout } from '../actions/index';

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
      console.log(answer);
    }

    logOut(e){
      this.props.dispatch(logout())
    }

    render() {

        return (
            <div className="question-list">
                {this.props.currentQuestion}
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
  currentQuestion: state.currentQuestion
})

export default connect(mapStateToProps)(QuestionPage);
