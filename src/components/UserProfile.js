import React, { useEffect, useState } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { useGetUserRank } from "../hooks/useGetSingleUserId";

const UserProfile = (props) => {
  const { name, platform, description, rating, id } = props;
  const [newRating, setNewRating] = useState(rating);
  const { getRank, userRating } = useGetUserRank();

  useEffect(() => {
    if (userRating !== undefined) {
      setNewRating(userRating);
    }
  }, [userRating]);

  const incrementDecrementRating = async (id, type) => {
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
  };

  return (
    <div className="w-[550px] min-h-[200px] rounded-lg shadow-md shadow-gray-800 bg-gradient-to-r from-purple-800 to-indigo-900 p-6 hover:-translate-y-1 transition-transform hover:ring-4">
      <div className="flex space-x-6">
        <img
          className="w-[100px] rounded-2xl"
          src="https://wielechowski.me/image/fifi.jpg"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-white font-semibold tracking-widest uppercase text-4xl">
            {name}
          </h1>
          <h1 className="text-white font-semibold tracking-widest uppercase text-4xl">
            {platform}
          </h1>
        </div>
        <div className="flex flex-col flex-grow justify-center items-end space-y-2">
          <BsArrowUpSquareFill
            onClick={() => {
              incrementDecrementRating(id, "inc");
            }}
            className="w-[30px] h-[30px] fill-white hover:fill-fuchsia-600 cursor-pointer"
          />
          <BsArrowDownSquareFill
            onClick={() => {
              incrementDecrementRating(id);
            }}
            className="w-[30px] h-[30px] fill-white hover:fill-fuchsia-600 cursor-pointer"
          />
        </div>
      </div>
      <p className="text-white text-base text-justify tracking-wider mt-2">
        {description}
      </p>
      <div className="flex justify-end">
        <p className="text-white tracking-widest mt-2">Rating: {newRating}</p>
      </div>
    </div>
  );
};

export default UserProfile;