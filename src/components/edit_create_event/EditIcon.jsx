//Matilde

import { FiEdit3 } from "react-icons/fi";
import EditEventPopUp from "./forms/EditPopUp";
import { useState } from "react";
import { motion } from "motion/react";

const EditIcon = ({ event, onEdit }) => {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* Knap med rød cirkel baggrund og hvidt ikon*/}
      {/* <button onClick={setShowPopup} className="bg-primary-red hover:bg-primary-red-hover2 text-white rounded-full p-2 ease-in-out duration-200 w-10 h-10">
      <FiEdit3 size={24}></FiEdit3>
    </button> */}

      {/* Knap med rødt ikon uden baggrund */}
      <motion.button
        onClick={setShowPopup}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="text-primary-red hover:text-primary-red-hover2 ease-in-out duration-200"
      >
        <FiEdit3 size={32} strokeWidth={1.5}></FiEdit3>
      </motion.button>

      {showPopup && (
        <EditEventPopUp
          eventToEdit={event}
          closePopup={closePopup}
          onEditSuccess={(updatedEvent) => {
            onEdit(updatedEvent);
            closePopup();
          }}
        ></EditEventPopUp>
      )}
    </>
  );
};

export default EditIcon;
