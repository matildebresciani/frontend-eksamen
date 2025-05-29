import React, { useState, useEffect } from "react";
import { useEventFormLogic } from "../../../utils/eventFormsLogic"; // Din custom hook med dates, locations osv.
import PopUpBase from "../../PopUpBaseLayout";
import Button from "../../Button";
import { RxCross2 } from "react-icons/rx";
import EditEventForm from "./EditEventForm";
import ArtworkListEdit from "./ArtworksListEdit";
import { EditEvent } from "@/api-mappe/EventsApiKald";


const EditEventPopUp = ({ eventToEdit, closePopup, onEditSuccess }) => {
  const { dates, locations, isLocationOccupied, isDateOccupied } = useEventFormLogic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedArtworks, setSelectedArtworks] = useState(
    eventToEdit.artworkIds || []
  );
  const [selectedLocation, setSelectedLocation] = useState(eventToEdit.locationId || null);
  const [selectedDate, setSelectedDate] = useState(eventToEdit.date || null);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 const maxSelection = selectedLocation
  ? locations.find(loc => loc.id === selectedLocation)?.maxArtworks ?? 0
  : 0;  

  useEffect(() => {
    console.log("eventToEdit.date ændret til:", eventToEdit.date);
    if (eventToEdit?.date) {
      setSelectedDate(eventToEdit.date);
    }
  }, [eventToEdit]);
  
  useEffect(() => {
    console.log("selectedDate opdateret til:", selectedDate);
  }, [selectedDate]);
  
   

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // Kombiner formData + artworks og opdater event
      const updatedEventData = {
        ...formData,
        artworkIds: selectedArtworks,  // sørg for at artworks sendes med her, hvis api understøtter det
      };
      
      //Gør så loading på knappen kører i 1 sekund
      const [updatedEvent] = await Promise.all([EditEvent(eventToEdit.id, updatedEventData), wait(1000),]);

      const fullLocation = locations.find(loc => loc.id === updatedEvent.locationId);
        updatedEvent.location = fullLocation || null;

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

      <h3 className="uppercase px-2">Rediger Event</h3>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-4">
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
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onLocationChange={setSelectedLocation}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ArtworkListEdit 
        selectedArtworks={selectedArtworks}
        setSelectedArtworks={setSelectedArtworks}
        maxSelection={maxSelection}
        excludeEventId={eventToEdit.id}
        selectedDate={selectedDate}
        />
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
