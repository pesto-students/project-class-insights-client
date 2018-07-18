import React from 'react';
import { Form, Field } from 'react-final-form';
import StarRatingComponent from 'react-star-rating-component';

import {
  Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { studentFeedbackServices } from '../../services';
import { validations } from '../../helpers/validations';
import FormError from '../FormError';

class StudentFeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      subtopicsArray: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentWillMount() {
    const { getData } = this.props;
    await getData();
    const { requestedForm } = this.props;
    this.setState({
      subtopicsArray: requestedForm.subtopics.map(st => st.subtopicName),
    });
    this.setState({
      form: requestedForm,
    });
  }

  async handleSubmit(formData) {
    const { requestedForm } = this.props;
    const response = await studentFeedbackServices.sendStudentFeedback(formData, requestedForm);
    if (response.success) {
      this.setState({ response: 'submitted' });
    }
  }

  render() {
    const { response, form, subtopicsArray } = this.state;
    return (
      <div>
        {response}
        <h1>
          Feedback Submission
        </h1>
        <h2>
          Subject -
          { form.subject }
        </h2>
        <h2>
          Topic -
          { form.topic }
        </h2>
        <Form
          onSubmit={this.handleSubmit}
          render={({
            handleSubmit, submitting, pristine, invalid,
          }) => (
            <form name="feedbackSubmission" onSubmit={handleSubmit}>
              <h2>
                Subtopics -
              </h2>
              {
                subtopicsArray.map((subtopic, i) => {
                  return (
                    <FormGroup key={subtopic}>
                      <Field name={`rating${i}`} validate={validations.required}>
                        {({ input, meta }) => (
                          <div>
                            <Label for="rating">
                              {subtopic}
                            </Label>
                            <br />
                            <StarRatingComponent
                              {...input}
                              name="rating"
                              id="rating"
                              onStarClick={input.onChange}
                              starCount={10}
                            />
                            <FormError meta={meta} />
                          </div>
                        )}
                      </Field>
                    </FormGroup>
                  );
                })
              }
              <FormGroup>
                <Field name="comment" validate={validations.required}>
                  {({ input, meta }) => (
                    <div>
                      <Label for="Comment">
                        Comment
                      </Label>
                      <br />
                      <Input
                        {...input}
                        type="textarea"
                        name="comment"
                        id="comment"
                        className="form-control mt-2"
                      />
                      <FormError meta={meta} />
                    </div>
                  )}
                </Field>
              </FormGroup>
              <FormGroup>
                <Field name="revisit">
                  {({ input, meta }) => (
                    <div>
                      <Label for="revisit">
                        revisit
                      </Label>
                      <Input
                        {...input}
                        type="checkbox"
                        name="revisit"
                        id="revisit"
                      />
                      <FormError meta={meta} />
                    </div>
                  )}
                </Field>
              </FormGroup>
              <Button type="submit" disabled={submitting || pristine || invalid} color="primary" size="lg" block>
                submit
              </Button>
            </form>

          )}
        />
      </div>
    );
  }
}


export default StudentFeedbackForm;
