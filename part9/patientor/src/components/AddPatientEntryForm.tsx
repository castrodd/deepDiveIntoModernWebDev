import { Field, Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";
import { TextField } from "../AddPatientModal/FormField";
import { Entry } from "../types";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
   // const [{ diagnoses }] = useStateValue()
  
    return (
      <Formik
        initialValues={{
            date: "1-1-0001",
            type: "OccupationalHealthCare",
            specialist: "Anon",
            description: "Sample POST"
        }}
        onSubmit={onSubmit}
        validate={() => {
          return {};
        }}
      >
      {({ isValid, dirty }) => {
  
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
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