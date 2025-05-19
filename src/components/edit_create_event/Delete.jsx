import { deleteEvent } from "@/api-mappe/EventsApiKald";
import PopUpBase from "../PopUpBaseLayout";
import Button from "../Button";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";

const DeleteBtn = ({ eventId, onDeleted }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = async () => {
        try {
          await deleteEvent(eventId);
          setShowPopup(false);
          if (onDeleted) onDeleted(); // fx opdater UI
        } catch (error) {
          console.error("Kunne ikke slette eventet:", error);
        }
      };

    return (
    <>
    <button
    onClick={() => setShowPopup(true)}
    className="text-primary-red hover:text-primary-red-hover2"
    aria-label="Slet event">
        <LuTrash2 size={28} />
    </button>

    {showPopup && (
    <PopUpBase>
        <p>Er du sikker på at du vil slette dette event?</p>
        <div className="flex gap-4 justify-center mt-4">
        <Button variant="CTA" onClick={handleDelete}>JA</Button>
        <Button variant="tertiary" onClick={() => setShowPopup(false)}>NEJ</Button>
        </div>
    </PopUpBase>
    )}
    
    </> );
}

export default DeleteBtn;
