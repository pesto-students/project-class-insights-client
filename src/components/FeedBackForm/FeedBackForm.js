import React from 'react';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import { formService } from '../../services/sendForm';

class FeedBackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addText = this.addText.bind(this);
  }

  handleSubmit(formData) {
    formService.sendForm(formData);
    this.setState({ response: 'submitted' });
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        {response}
        <Form
          onSubmit={this.handleSubmit}
          mutators={{ ...arrayMutators }}
          render={({
            handleSubmit, form: { mutators: { push, pop } }, submitting, pristine,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                subject
                <Field name="subject">
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="text" placeholder="Enter the subject" />
                      {meta.error && meta.touched && (
                      <span>
                        {meta.error}
                      </span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div>
                Topic
                <Field name="topic">
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="text" placeholder="Enter the topic" />
                      {meta.error && meta.touched && (
                      <span>
                        {meta.error}
                      </span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <div>
                sub topic
                <Field name="subtopics">
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="text" placeholder="Enter the sub topic" />
                      {meta.error && meta.touched && (
                        <span>
                          {meta.error}
                        </span>
                      )}
                    </div>
                  )}
                </Field>
              </div>
              <FieldArray name="test">
                {({ fields }) => fields.map((name, index) => (
                  <div key={name}>
                    {index + 1}
                    <Field name={name}>
                      {({ input, meta }) => (
                        <div>
                          <input {...input} type="text" placeholder="Enter the sub topic" />
                          {meta.error && meta.touched && (
                          <span>
                            {meta.error}
                          </span>
                          )}
                        </div>
                      )}
                    </Field>
                    <button type="button" onClick={() => { fields.remove(index); }}>
                      Remove
                    </button>
                  </div>
                ))}
              </FieldArray>
              <div>
                Date
                <Field
                  component="input"
                  name="date"
                  type="date"
                />
              </div>
              <div>
                BatchId
                <Field
                  component="input"
                  name="batchId"
                  type="text"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => push('test', undefined)}
                >
                Add fields
                </button>
                <button
                  type="button"
                  onClick={() => pop('test')}
                >
                Remove fields
                </button>
              </div>
              <button type="submit" disabled={submitting || pristine}>
              submit
              </button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default FeedBackForm;
