import { Field, Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";
import { SelectField, TextField, EntryOption } from "../AddPatientModal/FormField";
import { Entry, EntryType } from "../types";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const TypeOptions: EntryOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthCare, label: "OccupationalHealthCare" }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
   // const [{ diagnoses }] = useStateValue()
    return (
      <Formik
        initialValues={{
            date: "1-1-1111",
            type: EntryType.OccupationalHealthCare,
            specialist: "Anon",
            description: "This is a description."
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.type) {
            errors.type = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          return errors;
        }}
      >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
             <SelectField
              label="Type"
              name="type"
              options={TypeOptions}
            />
            <Field
              label="Date"
              placeholder="Date"
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
              label="Description "
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="EmployerName"
              placeholder="EmployerName"
              name="employerName"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  };