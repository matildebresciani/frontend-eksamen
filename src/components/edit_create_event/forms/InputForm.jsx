"use client"

//Matilde
//Brugt AI til at få hele formularen til at hænge sammen efter det meste fra RHF var blevet sat op
//Også gjort brug af AI til at håndtere om dato og lokation er tilgengængelig afhængigt af hinanden
//AI til at implementere loading effekt på knap

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEventFormLogic } from "../../../utils/eventFormsLogic";
import Button from "../../Button";
import Link from "next/link";
import BtnWithArrow from "../../BtnWithArrow";
import { RxCross2 } from "react-icons/rx";
import PopUpBase from "../../PopUpBaseLayout";
import { Input, Select, Textarea } from "./FormFields";

const EventForm = ({onNext, selectedArtworks, selectedDate, setSelectedDate, selectedLocation, setSelectedLocation, createNewEvent}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { dates, locations, isLocationOccupied, isDateOccupied } = useEventFormLogic();

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [showPopup, setShowPopup] = useState(false);
  const [eventLink, setEventLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const selectedDate = watch("date");
  // const selectedLocation = watch("locationId");

    // Observer "date" feltet
    const watchedDate = watch("date");
    const watchedLocation = watch("locationId");
  
    useEffect(() => {
      setSelectedDate(watchedDate);
    }, [watchedDate, setSelectedDate]);
  
    useEffect(() => {
      setSelectedLocation(watchedLocation);
    }, [watchedLocation, setSelectedLocation]);

  const dateOptions = dates.map(date => ({
    id: date,
    name: date,
    disabled: selectedLocation ? isDateOccupied(date, selectedLocation) : false,
  }));

  const locationOptions = locations.map(loc => ({
    id: loc.id,
    name: `${loc.name} (${loc.address})`,
    disabled: selectedDate ? isLocationOccupied(loc.id, selectedDate) : false,
  }));

  // const onSubmit = async (data) => {
  //   setIsSubmitting(true);
  //   try {
  //     console.log("selectedArtworks ved submit:", selectedArtworks);
  //     const cleanedArtworkIds = selectedArtworks.map(id => id.replace('_object', ''));
  //     const eventData = { ...data, artworkIds: cleanedArtworkIds };
  //     console.log("Data der sendes ved oprettelse af event:", eventData); 
  //     const [createdEvent] = await Promise.all([createNewEvent(eventData), wait(1000)]);
  //     setEventLink(`/events/${createdEvent.id}`);
  //     setShowPopup(true);
  //     reset();
  //     console.log("Nyt event:", createdEvent);
  //   } catch (error) {
  //     console.log("SENDES TIL API:", data);
  //   } finally {
  //     setIsSubmitting(false); // Stop loading – også ved fejl
  //   }
  // };

  const onSubmit = (data) => {
    onNext(data);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-fit">
        <Select label="Dato:" name="date" options={dateOptions} placeholder="Vælg en dato" {...register("date", { required: "Dato skal vælges" })} error={errors.date} />
        <Select label="Lokation:" name="locationId" options={locationOptions} placeholder="Vælg en lokation" {...register("locationId", { required: "Lokation skal vælges" })} error={errors.locationId} />
        <Input label="Event Navn:" name="title" placeholder="Navn på event..." register={register} required={{ value: true, message: "Navn skal udfyldes" }} error={errors.title} />
        <Textarea label="Beskrivelse:" name="description" placeholder="Event beskrivelse..." register={register} required={{ value: true, message: "Beskrivelse skal udfyldes" }} error={errors.description} />
        {/* <Button variant="tertiary" type="submit">Gem Kladde</Button> */}
        {/* <Button
        variant="CTA"
        type="submit"
        loading={isSubmitting}
        loadingText="Opretter event..."
      >
        Opret Event
      </Button> */}
              <Button
        variant="transparent"
        type="submit"
        loading={isSubmitting}
        loadingText="Næste step..."
      >
        Gå til vælg værker
      </Button>

      </form>
      {showPopup && (
        <PopUpBase>
          <div className="flex justify-end">
            <button onClick={closePopup} className="hover:text-gray-500 ease-in-out duration-300">
              <RxCross2 />
            </button>
          </div>
          <p className="text-center">Event oprettet!</p>
          <div className="flex justify-center">
            <Link href={eventLink}>
              <BtnWithArrow>Gå til event</BtnWithArrow>
            </Link>
          </div>
        </PopUpBase>
      )}
    </>
  );
};

export default EventForm;
