import React from 'react';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/index';
import ErrorPage from './errorPage';
import SuccessPage from './successPage';
import QuestionPage from './question-page';
import LoginPage from './login-page';

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
      this.props.dispatch(checkLogin())
    }

    render() {
        if (!this.props.currentUser) {
            return <LoginPage />;
        }
        if (this.props.questionScore === 1){
          return<SuccessPage />
        }
        if (this.props.questionScore === -1){
          return<ErrorPage />
        }
        if (this.props.questionScore === 0) {
          return <QuestionPage />;
        }
    }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.currentUser,
  questionScore: state.questionScore
})

export default connect(mapStateToProps)(App)
