import { useState } from "react";

export const useGetAllUsers = () => {
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const getUsers = async () => {
    setFetching(true);
    setFetched(false);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-83ecd-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setFetched(true);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setFetching(false);
    }
  };
  return { getUsers, error, fetching, fetched, data };
};
