import React, { Fragment, useEffect, useState } from "react";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import UserProfile from "../components/UserProfile";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";

function mapObjectsToArray(obj) {
  return Object.entries(obj).map(([key, value]) => ({ id: key, ...value }));
}

const StreamerList = () => {
  const [parsedData, setParsedData] = useState();
  const { getUsers, error, fetching, fetched, data } = useGetAllUsers();
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState();
  const [userDataId, setUserDataId] = useState();
  const [updateListRating, setUpdateListRating] = useState();

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
            img={user.img}
            setModal={setModal}
            setUserData={setUserData}
            setUserDataId={setUserDataId}
          />
        );
      })
    );
  }, [data]);

  return (
    <Fragment>
      {modal && (
        <Modal
          setModal={setModal}
          userData={userData}
          userDataId={userDataId}
          setUserData={setUserData}
          setUpdateListRating={setUpdateListRating}
        />
      )}
      {fetching && <Spinner />}
      {error && <p className="text-red-500">Could not fetch users</p>}
      <div>{fetched && <div className="space-y-3">{parsedData}</div>}</div>
    </Fragment>
  );
};

export default StreamerList;
