//Matilde
//Prompt: Hvordan får jeg min form og artworks list til at hænge sammen, så når man gemmer, gemmer den både data
// fra form og artworks list, når de ligger i forskellige komponenter, og min submit knap er her i pop uppen

import React, { useState, useEffect } from "react";
import { useEventFormLogic } from "../../../utils/eventFormsLogic";
import PopUpBase from "../../PopUpBaseLayout";
import Button from "../../Button";
import { RxCross2 } from "react-icons/rx";
import EditEventForm from "./EditEventForm";
import ArtworkListEdit from "./ArtworksListEdit";
import { EditEvent } from "@/api-mappe/EventsApiKald";
import { wait } from "@/utils/wait";


const EditEventPopUp = ({ eventToEdit, closePopup, onEditSuccess }) => {
  //Data fra useEventFormLogic hook
  const { dates, locations, isLocationOccupied, isDateOccupied } = useEventFormLogic();

  //STATES
  const [isSubmitting, setIsSubmitting] = useState(false); //loading tilstand

  // State til valgte kunstværker i listen (initialiseret med eksisterende event-data)
  const [selectedArtworks, setSelectedArtworks] = useState(
    eventToEdit.artworkIds || []
  );

  // State til valgt lokation og dato (også fra eksisterende event)
  const [selectedLocation, setSelectedLocation] = useState(eventToEdit.locationId || null);
  const [selectedDate, setSelectedDate] = useState(eventToEdit.date || null);

  const [artworkError, setArtworkError] = useState(null); // Fejlbesked hvis man vælger for mange værker

  //Hjælpefunktion til loading på knap
  //const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Udregn hvor mange værker der må vælges til den valgte lokation
 const maxSelection = selectedLocation
  ? locations.find(loc => loc.id === selectedLocation)?.maxArtworks ?? 0
  : 0;  

  // Hvis dato i event ændrer sig (fx hvis man åbner et andet event), opdater den
  //Har været brugt til debug - ikke relevant længere
  useEffect(() => {
    if (eventToEdit?.date) {
      setSelectedDate(eventToEdit.date);
    }
  }, [eventToEdit]);
  

  // Håndterer når der trykkes på "Gem ændringer"
  const handleSubmit = async (formData) => {
    setArtworkError(null); // ryd tidligere fejl

    //Gør så man ikke kan gemme hvis værker valgt overstiger kapaciteten på lokationen
    if (selectedArtworks.length > maxSelection) {
      setArtworkError(`Du kan maks vælge ${maxSelection} værker til denne lokation.`);
      return;
    }
  
    setIsSubmitting(true); //Starter loading på knap

    try {
      // Kombiner formData + artworks og opdater event
      const updatedEventData = {
        ...formData,
        artworkIds: selectedArtworks,
      };

      //Laver PATCH request og gør så loading på knappen kører i 1 sekund
      const [updatedEvent] = await Promise.all([EditEvent(eventToEdit.id, updatedEventData), wait(1000),]);

      // Find og tilføj fulde lokationsoplysninger
      const fullLocation = locations.find(loc => loc.id === updatedEvent.locationId);
        updatedEvent.location = fullLocation || null;

      // Kald callback med nyt event og luk popup
      onEditSuccess(updatedEvent);
      closePopup();
    } catch (error) {
      console.error("Fejl ved opdatering af event:", error);
      // evt vis fejlbesked til bruger ved at lave submitError og setSubmitError
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
        eventToEdit={eventToEdit} //prop fra parent (event page og single event page)
        dates={dates} //datoer fra useEventFormLogic
        locations={locations} //lokationer fra useEventFormLogic
        isDateOccupied={isDateOccupied} //fra useEventFormLogic
        isLocationOccupied={isLocationOccupied} //fra useEventFormLogic
        onEditSuccess={(updatedEvent) => {
          onEditSuccess(updatedEvent); //fra parent
          closePopup();
        }}
        formId="edit-event-form" //Connecter form med submit knap
        setIsSubmitting={setIsSubmitting} //Lokal state, sættes i edit pop up
        selectedLocation={selectedLocation} //Lokal state, sendes som prop
        setSelectedLocation={setSelectedLocation} //Lokal state, sættes i edit pop up
        onLocationChange={setSelectedLocation} //Lokal - bruges til at ændre lokation i form
        selectedDate={selectedDate} //Lokal state
        setSelectedDate={setSelectedDate} //Lokal state - opdaterer valgt dato
      />
      <ArtworkListEdit 
        selectedArtworks={selectedArtworks} //Lokal - Allerede valgte artworks
        setSelectedArtworks={setSelectedArtworks} //Lokal - opdaterer valgte/nye artworks
        maxSelection={maxSelection} //Max værker baseret på valgt lokation
        excludeEventId={eventToEdit.id} // Sikrer at det aktuelle event ikke markerer sine egne værker som booked
        selectedDate={selectedDate} //Lokal - Tjekker om værker er optaget andre steder på valgt dato
        />
      </div>
      

      {artworkError && (
        <div className="flex justify-center items-center">
          <p className=" text-center !text-red-500 mt-2">{artworkError}</p>
        </div>
      )}
       <div className="flex justify-center">
      <Button
        form="edit-event-form" //Connecter submit knap med form
        type="submit"
        variant="CTA"
        loading={isSubmitting}
        loadingText="Gemmer ændringer..."
        className="mt-2"
      >
        Gem ændringer
      </Button>

      </div>
    </PopUpBase>
  );
};

export default EditEventPopUp;
