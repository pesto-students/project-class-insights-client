import React from 'react';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
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

import { formService } from '../../services/sendForm';
import { validations } from '../../helpers/validations';
import FormError from '../FormError';

class FeedBackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(formData) {
    await formService.sendForm(formData);
    this.setState({ response: 'submitted' });
  }

  render() {
    const { response } = this.state;
    return (
      <Container>
        <Row className="align-items-center h-100">
          <Col>
            {response}
          </Col>
        </Row>
        <Row className="align-items-center h-100">
          <Col
            sm="6"
            md="8"
            lg="5"
            xl="6"
            className="mx-auto"
          >
            <Card className="mt-5 justify-content-center">
              <CardBody className="mx-0">
                <h2 className="text-center">
                  Feedback Form Creation
                </h2>
                <Form
                  onSubmit={this.handleSubmit}
                  mutators={{ ...arrayMutators }}
                  render={({
                    handleSubmit,
                    form: { mutators: { push } },
                    submitting,
                    pristine,
                    invalid,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Field name="subject" validate={validations.required}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="subjectName" className="mt-2">
                                Subject
                              </Label>
                              <Input
                                {...input}
                                type="text"
                                id="subjectName"
                                name="subjectName"
                                placeholder="Enter subject name"
                                className="form-control"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
                      <FormGroup>
                        <Field name="topic" validate={validations.required}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="topicName" className="mt-2">
                                Topic
                              </Label>
                              <Input
                                {...input}
                                type="text"
                                id="topicName"
                                name="topicName"
                                placeholder="Enter topic name"
                                className="form-control"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
                      <FormGroup>
                        <Field name="subtopics">
                          {({ input, meta }) => (
                            <div>
                              <Label className="mt-2">
                                Sub Topic
                              </Label>
                              <Input
                                {...input}
                                type="text"
                                name="subtopic"
                                id="subtopic"
                                placeholder="Enter the sub topic"
                                className="form-control"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
                      <FieldArray name="subtopicsArray">
                        {
                          ({ fields }) => fields.map((name, index) => (
                            <Field name={name} key={name}>
                              {({ input, meta }) => (
                                <FormGroup>
                                  <Label className="mt-2">
                                    Sub Topic-&nbsp;
                                    { index + 2}
                                  </Label>
                                  <Input
                                    {...input}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the sub topic"
                                  />
                                  <RemoveSymbolButton
                                    onClick={() => { fields.remove(index); }}
                                  />
                                  <FormError meta={meta} />
                                </FormGroup>
                              )}
                            </Field>
                          ))
                        }
                      </FieldArray>
                      <FormGroup>
                        <Button
                          type="button"
                          className="mx-auto"
                          color="primary"
                          size="sm"
                          onClick={() => push('subtopicsArray', undefined)}
                        >
                          Add Subtopic
                        </Button>
                      </FormGroup>
                      <FormGroup>
                        <Field name="formDate" validate={validations.required}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="creationDate">
                                Date:
                              </Label>
                              <Input
                                {...input}
                                type="date"
                                name="creationDate"
                                id="creationDate"
                                className="form-control"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
                      <FormGroup>
                        <Field name="batchId" validate={validations.required}>
                          {({ input, meta }) => (
                            <div>
                              <Label for="batchId">
                                BatchID:
                              </Label>
                              <Input
                                {...input}
                                type="text"
                                name="batchId"
                                id="batchId"
                                className="form-control"
                              />
                              <FormError meta={meta} />
                            </div>
                          )}
                        </Field>
                      </FormGroup>
                      <Row className="mx-auto">
                        <Button
                          type="submit"
                          disabled={submitting || pristine || invalid}
                          className="mr-3 mx-auto"
                          color="primary"
                          size="lg"
                        >
                          Submit
                        </Button>
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

const RemoveSymbolButton = (props) => {
  return (
    <button
      {...props}
      type="button"
      className="close closeButton rounded-circle"
    >
      <span aria-hidden="true">
        &times;
      </span>
    </button>
  );
};

export default FeedBackForm;
