import React, { useState, useEffect } from "react";
import UserProfileExtended from "./UserProfileExtended";
import Spinner from "./Spinner";

const Modal = (props) => {
  const { setModal, userData, userDataId, setUserData } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
  }, []);

  const closeModal = () => {
    setUserData(null);
    setShow(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleEscape = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 w-full md:h-full bg-white flex flex-col items-center md:justify-center px-4 py-10 transition-opacity duration-500 overflow-auto ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        onClick={closeModal}
        className="fixed right-0 -top-2 text-4xl p-2 text-purple-900"
      >
        ×
      </button>
      {userData ? (
        <UserProfileExtended
          name={userData.name}
          description={userData.description}
          rating={userData.rating}
          platform={userData.platform}
          id={userDataId}
          img={userData.img}
          setUserData={setUserData}
        />
      ) : (
        <div>
          <Spinner className={!show && "hidden"} />
        </div>
      )}
    </div>
  );
};

export default Modal;
