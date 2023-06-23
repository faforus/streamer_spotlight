import React from "react";
import { useField, FastField } from "formik";
import { TextareaAutosize, FormHelperText } from "@mui/material";

const MuiTextareaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const isInvalid = meta.touched && meta.error;

  const fieldValue =
    field.value !== null && typeof field.value === "object"
      ? JSON.stringify(field.value)
      : field.value || "";

  return (
    <FastField name={props.name}>
      {({ form }) => (
        <>
          <TextareaAutosize
            {...field}
            {...props}
            value={fieldValue}
            className={`block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-black min-h-[50px] max-h-[200px] ${
              isInvalid ? "placeholder-red-600" : "placeholder-[#666666]"
            } ${
              isInvalid
                ? "border-red-600 focus:ring-red-600 hover:border-red-600"
                : "border-gray-400"
            }`}
          />
          {isInvalid && <FormHelperText error>{meta.error}</FormHelperText>}
        </>
      )}
    </FastField>
  );
};

export default MuiTextareaField;
