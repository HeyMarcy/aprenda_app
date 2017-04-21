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
              <div className="final-page">
                Your final score is: {this.props.score}
                <button onClick={this.replay}>Play Again</button>
                <button onClick={this.logOut}>Logout</button>
              </div>
      )
    }
}

const mapStateToProps = (state, props) => ({
  score: state.score
})

export default connect(mapStateToProps)(FinalPage);
