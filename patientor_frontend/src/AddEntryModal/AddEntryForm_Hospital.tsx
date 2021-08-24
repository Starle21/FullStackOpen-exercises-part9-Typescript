import React from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection } from "./FormField";
import { NewHospitalEntry, NewEntry, EntryType, Diagnosis } from "../types";
import { useStateValue } from "../state";

// can just do NewEntry
export type EntryFormValues = NewEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}
interface InitialValues {
  description: string;
  date: string;
  specialist: string;
  type: "Hospital";
  diagnosisCodes: Array<Diagnosis["code"]>;
  dischargeDate: string;
  dischargeCriteria: string;
}

const initalValuesForm: InitialValues = {
  description: "",
  date: "",
  specialist: "",
  type: "Hospital",
  diagnosisCodes: [],
  dischargeDate: "",
  dischargeCriteria: "",
};

const parseType = (values: InitialValues): EntryFormValues => {
  const { description, date, specialist, type, diagnosisCodes } = values;
  return {
    description,
    date,
    specialist,
    type,
    diagnosisCodes,
    discharge: {
      date: values.dischargeDate,
      criteria: values.dischargeCriteria,
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={initalValuesForm}
      onSubmit={(values) => onSubmit(parseType(values))}
      validate={(values: InitialValues) => {
        console.log(values);

        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = "Invalid format";
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.dischargeDate) {
          errors.dischargeDate = requiredError;
        } else if (!isDate(values.dischargeDate)) {
          errors.dischargeDate = "Invalid format";
        }
        if (!values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            {/* <Header as="h4">Hospital Type</Header> */}
            <Field
              label="Date of entry"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Header as="h5">Discharge</Header>
            <Field
              label="Date of discharge"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="dischargeCriteria"
              component={TextField}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
