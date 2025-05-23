import React, { useState } from "react";
import { useEventFormLogic } from "./eventFormsLogic"; // Din custom hook med dates, locations osv.
import PopUpBase from "../../PopUpBaseLayout";
import Button from "../../Button";
import { RxCross2 } from "react-icons/rx";
import EditEventForm from "./EditEventForm";
import ArtworkListEdit from "./ArtworksListEdit";
import { EditEvent } from "@/api-mappe/EventsApiKald";


const EditEventPopUp = ({ eventToEdit, closePopup, onEditSuccess }) => {
  const { dates, locations, isLocationOccupied, isDateOccupied } = useEventFormLogic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState(eventToEdit.artworks || []);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      // Kombiner formData + artworks og opdater event
      const updatedEventData = {
        ...formData,
        artworks: selectedArtworks,  // sørg for at artworks sendes med her, hvis api understøtter det
      };

      const updatedEvent = await EditEvent(eventToEdit.id, updatedEventData);

      onEditSuccess(updatedEvent);
      closePopup();
    } catch (error) {
      console.error("Fejl ved opdatering af event:", error);
      // evt vis fejlbesked til bruger
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PopUpBase>
      <div className="flex justify-end">
        <button
          onClick={closePopup}
          className="hover:text-gray-500 ease-in-out duration-300"
          aria-label="Luk popup"
        >
          <RxCross2 />
        </button>
      </div>

      <h3 className="uppercase">Rediger Event</h3>

        <div className="grid grid-cols-[1fr_2fr] gap-4">
      <EditEventForm
        onSubmitData={handleSubmit} 
        eventToEdit={eventToEdit}
        dates={dates}
        locations={locations}
        isDateOccupied={isDateOccupied}
        isLocationOccupied={isLocationOccupied}
        onEditSuccess={(updatedEvent) => {
          onEditSuccess(updatedEvent);
          closePopup();
        }}
        formId="edit-event-form"
        setIsSubmitting={setIsSubmitting}
      />
      <ArtworkListEdit 
        selectedArtworks={selectedArtworks}
        setSelectedArtworks={setSelectedArtworks}/>
      </div>

<div className="flex justify-center mt-4">
      <Button
        form="edit-event-form"
        type="submit"
        variant="CTA"
        loading={isSubmitting}
        loadingText="Gemmer ændringer..."
        className="mt-4"
      >
        Gem ændringer
      </Button>

</div>
    </PopUpBase>
  );
};

export default EditEventPopUp;
