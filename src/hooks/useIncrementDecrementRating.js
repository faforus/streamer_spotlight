import { useState } from "react";

export const incrementDecrementRating = () => {
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const setRating = async (id, type) => {
    const url = `https://react-http-83ecd-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();

      const updatedRating =
        type === "inc" ? userData.rating + 1 : userData.rating - 1;
      const updatedUserData = { ...userData, rating: updatedRating };

      const putResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!putResponse.ok) {
        throw new Error("Failed to update user data");
      }
      getRank(id);
    } catch (error) {
      console.error(error);
    }
    return { setRating, error, fetching, fetched, data };
  };
};
