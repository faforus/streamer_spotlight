import React, { useEffect, useState } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { useGetUserRank } from "../hooks/useGetSingleUserId";

const UserProfile = (props) => {
  const {
    name,
    platform,
    description,
    rating,
    id,
    jump,
    setModal,
    setUserData,
    setUserDataId,
  } = props;
  const [newRating, setNewRating] = useState(rating);
  const { getRank, userRating, newData } = useGetUserRank();

  useEffect(() => {
    if (userRating !== undefined) {
      setNewRating(userRating);
      setUserData(newData);
    }
  }, [userRating, newData]);

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
    <div
      onClick={() => {
        if (!jump) return;
        setUserDataId(id);
        setModal(true);
        getRank(id);
      }}
      //hover:-translate-y-1 transition-transform
      className={`md:w-[550px] min-h-[200px] rounded-lg shadow-md shadow-gray-800 bg-gradient-to-r from-purple-800 to-indigo-900 p-6 ${
        jump && "hover:ring-4"
      } ${jump && "cursor-pointer"}`}
    >
      <div className="flex flex-col items-center sm:flex-row md:space-x-6">
        <img
          className="w-[150px] md:w-[100px] rounded-2xl"
          src="https://wielechowski.me/image/fifi.jpg"
        />
        <div className="flex flex-col justify-center text-center md:text-left mt-3 md:mt-0">
          <h1 className="text-white font-semibold tracking-widest uppercase text-xl md:text-4xl">
            {name}
          </h1>
          <h1 className="text-white font-semibold tracking-widest uppercase text-xl md:text-4xl">
            {platform}
          </h1>
        </div>
        <div className="flex md:flex-col flex-row-reverse flex-grow justify-center items-end space-y-2">
          <BsArrowUpSquareFill
            onClick={(e) => {
              e.stopPropagation();
              incrementDecrementRating(id, "inc");
            }}
            className="w-[30px] h-[30px] fill-white hover:fill-fuchsia-600 cursor-pointer mx-1 md:mx-0"
          />
          <BsArrowDownSquareFill
            onClick={(e) => {
              e.stopPropagation();
              incrementDecrementRating(id);
            }}
            className="w-[30px] h-[30px] fill-white hover:fill-fuchsia-600 cursor-pointer mx-1 md:mx-0"
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
