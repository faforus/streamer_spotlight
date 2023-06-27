import React from "react";
const UserProfileExtended = (props) => {
  const { name, platform, rating, description, img } = props;

  return (
    <div className="md:w-[850px] md:min-h-[200px] rounded-lg shadow-md shadow-gray-800 bg-gradient-to-r from-purple-800 to-indigo-900 p-6">
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
      </div>
      <p className="text-white text-base text-justify tracking-wider mt-2">
        {description}
      </p>
      <div className="p-4 text-white tracking-wider space-y-4 md:space-y-0">
        <ul className="flex flex-col md:flex-row items-center justify-between">
          <li>More information 1</li>
          <li>More information 2</li>
          <li>More information 3</li>
          <li>More information 4</li>
        </ul>
        <ul className="flex flex-col md:flex-row items-center justify-between">
          <li>More information 5</li>
          <li>More information 6</li>
          <li>More information 7</li>
          <li>More information 8</li>
        </ul>
      </div>
      <div className="flex justify-end">
        <p className="text-white tracking-widest mt-2">Rating: {rating}</p>
      </div>
    </div>
  );
};

export default UserProfileExtended;
