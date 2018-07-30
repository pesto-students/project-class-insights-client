import React from 'react';
import { Form, Field } from 'react-final-form';
import StarRatingComponent from 'react-star-rating-component';
import queryString from 'query-string';

import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
} from 'reactstrap';
import Loader from '../Loader';
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
    const { location } = this.props;
    const { search } = location;
    const { formID } = queryString.parse(search);
    this.setState(() => ({
      isLoading: true,
    }));
    await getData(formID);
    const { requestedForm } = this.props;
    this.setState(() => ({
      isLoading: false,
    }));
    this.setState({
      subtopicsArray: requestedForm.subtopics.map(st => st.subtopicName),
    });
    this.setState({
      form: requestedForm,
    });
  }

  async handleSubmit(formData) {
    const { requestedForm } = this.props;
    this.setState(() => ({
      isLoading: true,
    }));
    const response = await studentFeedbackServices.sendStudentFeedback(formData, requestedForm);
    if (response.success) {
      this.setState({ response: 'Feedback submitted successfully' });
    }
    this.setState(() => ({
      isLoading: false,
    }));
  }

  render() {
    const {
      response,
      form,
      subtopicsArray,
      isLoading,
    } = this.state;

    if (isLoading) {
      return (
        <Loader />
      );
    }
    return (
      <Container>
        <Row>
          <Col
            sm="12"
            md="12"
            lg="12"
            xl="12"
            className="mx-auto text-center"
          >
            <h2>
              Feedback Submission
            </h2>
          </Col>
        </Row>
        <Row>
          <Col
            sm="12"
            md="12"
            lg="12"
            xl="12"
            className="mx-auto text-center"
          >
            <h4 className="form-text text-success">
              {response}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h4>
              {'Subject - '}
              <span className="text-info">
                { form.subject }
              </span>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h4>
              {'Topic - '}
              <span className="text-info">
                { form.topic }
              </span>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Form
                  onSubmit={this.handleSubmit}
                  render={({
                    handleSubmit, submitting, pristine, invalid,
                  }) => (
                    <form name="feedbackSubmission" onSubmit={handleSubmit}>
                      <h3 className="text-center my-2">
                        Subtopics:
                      </h3>
                      {
                        subtopicsArray.map((subtopic, i) => {
                          return (
                            <FormGroup key={subtopic}>
                              <Field
                                name={`rating${i}`}
                                initialValues={{ value: null }}
                                validate={validations.required}
                              >
                                {({ input, meta }) => (
                                  <div>

                                    <Row className="justify-content-center">
                                      <Col
                                        sm="3"
                                        md="3"
                                        lg="3"
                                        xl="4"
                                        xs="12"
                                        className="text-center"
                                      >
                                        <Label for="rating">
                                          {subtopic}
                                        </Label>
                                      </Col>
                                      <Col
                                        sm="3"
                                        md="3"
                                        lg="3"
                                        xl="4"
                                        xs="12"
                                        className="text-center"
                                      >
                                        <StarRatingComponent
                                          {...input}
                                          name="rating"
                                          id="rating"
                                          onStarClick={input.onChange}
                                          starCount={10}
                                        />
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col>
                                        <FormError meta={meta} />
                                      </Col>
                                    </Row>
                                  </div>
                                )}
                              </Field>
                            </FormGroup>
                          );
                        })
                    }
                      <Row>
                        <Col>
                          <FormGroup>
                            <Field name="comment" validate={validations.required}>
                              {({ input, meta }) => (
                                <Row className="justify-content-center">
                                  <Col
                                    sm="3"
                                    md="3"
                                    lg="3"
                                    xl="4"
                                    className="text-center"
                                  >
                                    <Label for="Comment">
                                      Comment
                                    </Label>
                                  </Col>
                                  <Col
                                    sm="3"
                                    md="3"
                                    lg="3"
                                    xl="4"
                                    className="text-center"
                                  >
                                    <Input
                                      {...input}
                                      type="textarea"
                                      name="comment"
                                      id="comment"
                                      className="form-control mt-2"
                                    />
                                  </Col>
                                  <FormError meta={meta} />
                                </Row>
                              )}
                            </Field>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Field type="checkbox" name="revisit">
                              {({ input, meta }) => (
                                <div>
                                  <Row className="justify-content-center">
                                    <Col
                                      sm="3"
                                      md="3"
                                      lg="3"
                                      xl="4"
                                      className="text-center"
                                    >
                                      <Label for="revisit">
                                        Revisit
                                      </Label>
                                    </Col>
                                    <Col
                                      sm="3"
                                      md="3"
                                      lg="3"
                                      xl="4"
                                      className="text-center"
                                    >
                                      <Input
                                        {...input}
                                        type="checkbox"
                                        name="revisit"
                                        id="revisit"
                                      />
                                    </Col>
                                  </Row>
                                  <FormError meta={meta} />
                                </div>
                              )}
                            </Field>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="justify-content-center">
                        <Col
                          md="4"
                          lg="2"
                          xl="4"
                        >
                          <FormGroup>
                            <Button
                              type="submit"
                              disabled={submitting || pristine || invalid}
                              color="primary"
                              block
                            >
                              Submit
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default StudentFeedbackForm;
