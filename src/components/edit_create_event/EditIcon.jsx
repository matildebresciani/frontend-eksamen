import { FiEdit3 } from "react-icons/fi";
import EditEventPopUp from "./forms/EditPopUp";
import { useState } from "react";

const EditIcon = ({event, onEdit}) => {
const [showPopup, setShowPopup] = useState(false);

const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
    <button onClick={setShowPopup} className="bg-primary-red hover:bg-primary-red-hover2 text-white rounded-full p-2 ease-in-out duration-200 w-10 h-10">
      <FiEdit3 size={24}></FiEdit3>
    </button>

    {showPopup && (
        <EditEventPopUp
        eventToEdit={event}
        closePopup={closePopup}
        onEditSuccess={(updatedEvent) => {
            onEdit(updatedEvent);
            closePopup();
          }}></EditEventPopUp>
    )}
    </>
  );
};

export default EditIcon;
