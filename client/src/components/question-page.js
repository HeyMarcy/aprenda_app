import React from 'react';
import { connect } from 'react-redux';
import * as Cookies from 'js-cookie';
import { getQuestions } from '../actions/index';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      this.props.dispatch(getQuestions())
    }

    render() {
        const questions = this.props.questions.map((question, index) =>
            <li key={index}>{question}</li>
        );

        return (
            <ul className="question-list">
                {questions}
            </ul>
        );
    }
}

const mapStateToProps = (state, props) => ({
  questions: state.questions
})

export default connect(mapStateToProps)(QuestionPage);
