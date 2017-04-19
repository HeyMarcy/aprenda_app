import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import { checkLogin } from '../actions/index';

import QuestionPage from './question-page';
import LoginPage from './login-page';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      this.props.dispatch(checkLogin())
    }

    render() {
        if (!this.props.currentUser) {
            return <LoginPage />;
        }

        return <QuestionPage />;
    }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps)(App)
