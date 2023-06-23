import { useState } from "react";

export const useGetUserRank = () => {
  const [newData, setNewData] = useState();
  //   const [fetching, setFetching] = useState(false);
  //   const [fetched, setFetched] = useState(false);
  //   const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState();

  const getRank = async (id) => {
    // setFetching(true);
    // setFetched(false);
    // setError(null);
    try {
      const url = `https://react-http-83ecd-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setUserRating(data.rating);
        setNewData(data);
        // setData(data);
        // setFetched(true);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      //   setError("Something went wrong");
      //   console.log(err.message);
    } finally {
      //   setFetching(false);
    }
  };
  return { getRank, userRating };
};
