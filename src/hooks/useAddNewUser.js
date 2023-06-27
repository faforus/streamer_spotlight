import { useState } from "react";

export const useAddNewUser = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    setSending(true);
    setSent(false);
    setError(null);
    try {
      const response = await fetch(
        "https://us-central1-streamer-spotlight.cloudfunctions.net/proxyUserData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
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
