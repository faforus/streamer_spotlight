import { useState } from "react";

export const useGetSignleUser = () => {
  const [newData, setNewData] = useState();
  const [userRating, setUserRating] = useState();

  const getRank = async (id) => {
    try {
      const url = `https://us-central1-wielechowski-me.cloudfunctions.net/proxyUserData?id=${id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setUserRating(data.rating);
        setNewData(data);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
    } finally {
    }
  };
  return { getRank, userRating, newData };
};
