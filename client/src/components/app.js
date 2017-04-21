import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import ErrorPage from './errorPage';
import SuccessPage from './successPage';
import QuestionPage from './question-page';
import LoginPage from './login-page';
import FinalPage from './final-page';

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
      this.props.dispatch(actions.checkLogin());
      this.props.dispatch(actions.getQuestions());
    }

    render() {
        if (!this.props.currentUser) {
          return <LoginPage />;
        }
        if (this.props.submitCount === 2) {
          return <FinalPage />
        }
        if (this.props.questionScore === 0) {
          return <QuestionPage />;
        }
        if (!this.props.currentUser) {
          return <LoginPage />;
        }
        if (this.props.questionScore === 1){
          return<SuccessPage />
        }
        if (this.props.questionScore === -1){
          return<ErrorPage />
        }
    }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.currentUser,
  questionScore: state.questionScore,
  submitCount: state.submitCount
})

export default connect(mapStateToProps)(App)
