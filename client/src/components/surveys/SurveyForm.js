import _ from 'lodash';
// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Allows redux form to communicate with redux store
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">arrow_right</i>
          </button>
        </form>
      </div>
    );
  }
}

// if errors has properties then the validate function will stop
// and report errors, hence invalidating the field
function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
}

// redux form helper only requires one option (form)
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
