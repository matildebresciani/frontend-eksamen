import { deleteEvent } from "@/api-mappe/EventsApiKald";
import PopUpBase from "../PopUpBaseLayout";
import Button from "../Button";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { motion } from "motion/react";

const DeleteBtn = ({ eventId, onDeleted }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await Promise.all([deleteEvent(eventId), wait(1000)]);
      setShowPopup(false);
      if (onDeleted) onDeleted(); // fx opdater UI
    } catch (error) {
      console.error("Kunne ikke slette eventet:", error);
      setIsDeleting(false); // nulstil hvis fejl
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setShowPopup(true)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="text-primary-red hover:text-primary-red-hover2 ease-in-out duration-200"
        aria-label="Slet event"
      >
        <LuTrash2 size={34} strokeWidth={1.5} />
      </motion.button>

      {showPopup && (
        <PopUpBase>
          <p>Er du sikker på at du vil slette dette event?</p>
          <div className="flex gap-4 justify-center mt-4">
            <Button
              variant="CTA"
              onClick={handleDelete}
              loading={isDeleting}
              loadingText="Sletter event..."
              className={`transition-all duration-300 ${
                isDeleting ? "flex-1" : "w-auto"
              }`}
            >
              {isDeleting ? "Sletter event..." : "JA"}
            </Button>

            {!isDeleting && (
              <Button variant="tertiary" onClick={() => setShowPopup(false)}>
                NEJ
              </Button>
            )}
          </div>
        </PopUpBase>
      )}
    </>
  );
};

export default DeleteBtn;
