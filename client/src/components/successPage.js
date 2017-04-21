import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

export class SuccessPage extends React.Component {
  constructor(props) {
      super(props);
      this.onSubmit=this.onSubmit.bind(this);
      this.logOut=this.logOut.bind(this);
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
        <button id="logout" onClick={this.logOut}>Logout</button>
        <h1>Nice!</h1>
          <form onSubmit={this.onSubmit}>
          <button type="submit">next question</button>
          </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  questionScore: state.questionScore
})

export default connect(mapStateToProps)(SuccessPage);
