import React from "react";
import { useField, FastField } from "formik";
import {
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const MuiSelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  const isInvalid = meta.touched && meta.error;

  const handleBlur = (event) => {
    field.onBlur(event);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        className={`${isInvalid && "red_label"}`}
        style={isInvalid ? { color: "#d32f2f" } : {}}
      >
        {label}
      </InputLabel>
      <FastField name={props.name}>
        {({ form }) => (
          <>
            <Select
              {...field}
              {...props}
              label={label}
              error={isInvalid}
              onBlur={handleBlur}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <div className="-ml-[14px] mt-[5px]">
              {isInvalid && <FormHelperText error>{meta.error}</FormHelperText>}
            </div>
          </>
        )}
      </FastField>
      <InputLabel />
    </FormControl>
  );
};

export default MuiSelectField;
