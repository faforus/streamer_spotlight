import React from "react";
import { useField, FastField } from "formik";
import { TextField, FormHelperText } from "@mui/material";

const MuiTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const isInvalid = meta.touched && meta.error;

  return (
    <FastField name={props.name}>
      {({ form }) => (
        <>
          <TextField {...field} {...props} label={label} error={isInvalid} />
          {isInvalid && <FormHelperText error>{meta.error}</FormHelperText>}
        </>
      )}
    </FastField>
  );
};

export default MuiTextField;
