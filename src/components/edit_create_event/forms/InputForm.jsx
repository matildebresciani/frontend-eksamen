"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEventFormLogic } from "./eventFormsLogic";
import Button from "../../Button";
import Link from "next/link";
import BtnWithArrow from "../../BtnWithArrow";
import { RxCross2 } from "react-icons/rx";
import PopUpBase from "../../PopUpBaseLayout";
import { Input, Select, Textarea } from "./FormFields";

const EventForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { dates, locations, isLocationOccupied, isDateOccupied, createNewEvent } = useEventFormLogic();

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [showPopup, setShowPopup] = useState(false);
  const [eventLink, setEventLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDate = watch("date");
  const selectedLocation = watch("locationId");

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const [createdEvent] = await Promise.all([createNewEvent(data), wait(1000)]);
      setEventLink(`/events/${createdEvent.id}`);
      setShowPopup(true);
      console.log("Nyt event:", data)
    } catch (error) {
      console.log("SENDES TIL API:", data);
    } finally {
      setIsSubmitting(false); // Stop loading – også ved fejl
    }
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
        <Button variant="tertiary" type="submit">Gem Kladde</Button>
        <Button
        variant="CTA"
        type="submit"
        loading={isSubmitting}
        loadingText="Opretter event..."
      >
        Opret Event
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
