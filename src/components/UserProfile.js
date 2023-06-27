import React, { useEffect, useState } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { useGetSignleUser } from "../hooks/useGetSingleUser";
import useRatingUpdater from "../hooks/useIncrementDecrementRating";

const UserProfile = (props) => {
  const {
    name,
    platform,
    description,
    rating,
    id,
    img,
    setModal,
    setUserData,
    setUserDataId,
  } = props;
  const [newRating, setNewRating] = useState(rating);

  const { getRank, userRating, newData } = useGetSignleUser();
  const handleRatingUpdate = (updatedRating) => {
    setNewRating(updatedRating);
  };
  const { incrementDecrementRating } = useRatingUpdater(handleRatingUpdate);

  useEffect(() => {
    if (userRating !== undefined) {
      setNewRating(userRating);
      setUserData(newData);
    }
  }, [userRating, newData]);

  return (
    <div
      onClick={() => {
        setUserDataId(id);
        setModal(true);
        getRank(id);
      }}
      className="md:w-[550px] md:min-h-[200px] rounded-lg shadow-md shadow-gray-800 bg-gradient-to-r from-purple-800 to-indigo-900 p-6 hover:ring-4 cursor-pointer"
    >
      <div className="flex flex-col items-center sm:flex-row md:space-x-6">
        <img
          className="w-[150px] h-[150px] md:w-[100px] md:h-[100px] object-cover object-top rounded-2xl"
          alt={name}
          src={img}
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
              incrementDecrementRating(id, "dec");
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
