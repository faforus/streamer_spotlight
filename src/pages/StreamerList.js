import React, { useEffect, useState } from "react";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import UserProfile from "../components/UserProfile";

function mapObjectsToArray(obj) {
  return Object.entries(obj).map(([key, value]) => ({ id: key, ...value }));
}

const StreamerList = () => {
  const [parsedData, setParsedData] = useState();
  const { getUsers, error, fetching, fetched, data } = useGetAllUsers();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const parsedData = mapObjectsToArray(data);

    setParsedData(
      parsedData.map((user, index) => {
        return (
          <UserProfile
            key={index}
            name={user.name}
            description={user.description}
            rating={user.rating}
            platform={user.platform}
            id={user.id}
          />
        );
      })
    );
  }, [data]);

  return (
    <div>
      {fetched && <div className="space-y-3">{parsedData}</div>}
      {/* <button
        onClick={() => {
          getUsers();
        }}
        disabled={fetching}
        className="relative inline-block px-6 py-3 font-medium leading-6 text-white transition duration-200 ease-in-out bg-gradient-to-r from-purple-800 to-indigo-900 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg shadow-sm disabled:cursor-not-allowed disabled:opacity-50 my-4"
      >
        Fetch users
      </button> */}
    </div>
  );
};

export default StreamerList;
