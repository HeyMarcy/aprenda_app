import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

export class FinalPage extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.replay = this.replay.bind(this);
    }

    logOut(e){
      this.props.dispatch(actions.logout());
    }

    replay(e) {
      console.log('click')
      this.props.dispatch(actions.getQuestions());
      this.props.dispatch(actions.playAgain());
    }

    render() {
      return(
        <div id="info">
          <p>Your final score is: <span>{this.props.score}</span> </p>
          <button onClick={this.replay}>Play Again</button>
          <button id="logout" onClick={this.logOut}>Logout</button>
        </div>
      )
    }
}

const mapStateToProps = (state, props) => ({
  score: state.score
})

export default connect(mapStateToProps)(FinalPage);
