import React from "react";
import "./index.css";
import { Formik, Field, Form, ErrorMessage } from "formik";

function App() {
  return (
    <div className="App">
      <Formik
        style={{ maxWidth: "500px" }}
        initialValues={{
          header: "Formik is amazing",
          options: [],
          choices: [
            {
              id: 0,
              label: "a"
            },
            {
              id: 1,
              label: "b"
            },
            {
              id: 2,
              label: "c"
            }
          ]
        }}
        validate={({ header }) => {
          const errors = {};
          if (header.length < 6)
            errors.header = "header must be at least 6 characters long";

          return errors;
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);

          setTimeout(() => {
            console.log(data);
            setSubmitting(false);
          }, 2000);
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <Field name="header" style={{ width: "100%" }} />
              <ErrorMessage name="header" component="div" />
            </div>
            <div>
              <label>Options</label>
              <div>
                <label>nosubmit</label>
                <Field name="options" value="nosubmit" type="checkbox" />
              </div>
              <div>
                <label>readonly</label>
                <Field name="options" value="readonly" type="checkbox" />
              </div>
              <div>
                <label>snickerdoodles</label>
                <Field name="options" value="snickerdoodles" type="checkbox" />
              </div>
            </div>
            <div>
              Choices:
              {values.choices.map(c => (
                <div key={c.id}>
                  <Field name="choices" type="radio" />
                  <label>{c.label}</label>
                </div>
              ))}
            </div>

            <button
              disabled={
                isSubmitting || values.options.some(opt => opt === "nosubmit")
              }
              type="submit"
            >
              Submit
            </button>

            <div style={{ display: "flex" }}>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
