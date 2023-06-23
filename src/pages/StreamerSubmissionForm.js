import React from "react";
import MuiTextField from "../components/form_components/MuiTextField";
import MuiSelectField from "../components/form_components/MuiSelectField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MuiTextareaField from "../components/form_components/MuiTextAreaField";
import { useNewUser } from "../hooks/useNewUser";

const options = [
  { value: "Twitch", label: "Twitch" },
  { value: "YouTube", label: "YouTube" },
  { value: "TikTok", label: "TikTok" },
  { value: "Kick", label: "Kick" },
  { value: "Rumble", label: "Rumble" },
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter a name")
    .min(3, "Name must be at least 3 characters")
    .max(14, "Name must be less than 14 characters"),
  platform: Yup.string().required("Please select a platform"),
  description: Yup.string()
    .required("Please enter description")
    .min(3, "Description must be at least 10 characters")
    .max(300, "Description must be less than 100 characters"),
});

const StreamerSubmissionForm = () => {
  const { handleSubmit, error, sending, sent } = useNewUser();

  return (
    <div>
      <Formik
        initialValues={{ name: "", platform: "", description: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={true}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col space-y-2">
            <MuiTextField
              className="textInput"
              name="name"
              label="Name"
              type="text"
            />

            <MuiSelectField
              name="platform"
              label="Platform"
              options={options}
            />

            <MuiTextareaField
              placeholder="Description"
              name="description"
              value=""
            />

            <button
              type="submit"
              disabled={sending}
              className="relative inline-block px-6 py-3 font-medium leading-6 text-white transition duration-200 ease-in-out bg-gradient-to-r from-purple-800 to-indigo-900 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="relative z-20 shadow-sm">Add user</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StreamerSubmissionForm;
