import { useState } from "react";

export const useNewUser = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    setSending(true);
    setSent(false);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-83ecd-default-rtdb.europe-west1.firebasedatabase.app/users.json",
        {
          method: "POST",
          body: JSON.stringify({ ...values, rating: 0 }),
        }
      );
      if (response.ok) {
        setSent(true);
        resetForm();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSending(false);
    }
  };
  return { handleSubmit, error, sending, sent };
};
