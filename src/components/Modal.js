import React from "react";
import UserProfile from "./UserProfile";

const Modal = (props) => {
  const { setModal } = props;
  return (
    <div className="fixed inset-0 w-full h-full bg-white flex flex-col items-center justify-center">
      <button
        onClick={() => {
          setModal(false);
        }}
        className="fixed right-0 top-0 text-4xl p-2 text-purple-900"
      >
        ×
      </button>
      <UserProfile />
    </div>
  );
};

export default Modal;
