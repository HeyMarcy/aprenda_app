import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';


export class errorPage extends React.Component {
  constructor(props) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      this.logOut = this.logOut.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    let questionScore = 0;
    this.props.dispatch(actions.reloadQuestion(questionScore))
  }
  logOut(e){
    this.props.dispatch(actions.logout())
  }
  render(){
    return (
      <div >
        <button onClick={this.logOut}>Logout</button>
        <p> Oh, too bad. The correct answer is {this.props.questions[this.props.submitCount -1].english}</p>
          <form onSubmit={this.onSubmit}>
          <button type="submit">next question</button>
          </form>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  questionScore: state.questionScore,
  currentQuestion: state.currentQuestion,
  questions: state.questions,
  submitCount: state.submitCount
})

export default connect(mapStateToProps)(errorPage);
