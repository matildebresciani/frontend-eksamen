//Matilde
//Brugt AI til at få hele formularen til at hænge sammen efter det meste fra RHF var blevet sat op
//Også gjort brug af AI til at håndtere om dato og lokation er tilgengængelig afhængigt af hinanden
//AI til at implementere loading effekt på knap

"use client"

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";  // <-- Importer Controller
import { useEventFormLogic } from "../../../utils/eventFormsLogic";
import Button from "../../Button";
import Link from "next/link";
import BtnWithArrow from "../../BtnWithArrow";
import { RxCross2 } from "react-icons/rx";
import PopUpBase from "../../PopUpBaseLayout";
import { Input, Select, Textarea } from "./FormFields";

const EventForm = ({
  formRef,
  onNext,
  selectedArtworks,
  selectedDate,
  setSelectedDate,
  selectedLocation,
  setSelectedLocation,
  createNewEvent,
}) => {
  const {
    control,  // <-- Controller bruger vi her
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      date: "",        // default tom værdi = placeholder vises
      locationId: "",  // samme her
    },
  });

  const { dates, locations, isLocationOccupied, isDateOccupied } = useEventFormLogic();

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [showPopup, setShowPopup] = useState(false);
  const [eventLink, setEventLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const watchedDate = watch("date");
  const watchedLocation = watch("locationId");

  useEffect(() => {
    setSelectedDate(watchedDate);
  }, [watchedDate, setSelectedDate]);

  useEffect(() => {
    setSelectedLocation(watchedLocation);
  }, [watchedLocation, setSelectedLocation]);

  const dateOptions = dates.map((date) => ({
    id: date,
    name: date,
    disabled: selectedLocation ? isDateOccupied(date, selectedLocation) : false,
  }));

  const locationOptions = locations.map((loc) => ({
    id: loc.id,
    name: `${loc.name} (${loc.address})`,
    maxArtworks: loc.maxArtworks,
    disabled: selectedDate ? isLocationOccupied(loc.id, selectedDate) : false,
  }));

  const onSubmit = (data) => {
    onNext(data);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  //Henter den nyeste og opdaterede data fra formularen
  useEffect(() => {
    if (formRef) {
      formRef.current = { getValues };
    }
  }, [formRef, getValues]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-fit">
        <Controller
          name="date"
          control={control}
          rules={{ required: "Dato skal vælges" }}
          render={({ field }) => (
            <Select
              label="Dato:"
              {...field}
              options={dateOptions}
              placeholder="Vælg en dato"
              error={errors.date}
            />
          )}
        />

        <Controller
          name="locationId"
          control={control}
          rules={{ required: "Lokation skal vælges" }}
          render={({ field }) => (
            <Select
              label="Lokation:"
              {...field}
              options={locationOptions}
              placeholder="Vælg en lokation"
              error={errors.locationId}
            />
          )}
        />

        <Input
          label="Event Navn:"
          name="title"
          placeholder="Navn på event..."
          register={register}
          required={{ value: true, message: "Navn skal udfyldes" }}
          error={errors.title}
        />
        <Textarea
          label="Beskrivelse:"
          name="description"
          placeholder="Event beskrivelse..."
          register={register}
          required={{ value: true, message: "Beskrivelse skal udfyldes" }}
          error={errors.description}
        />
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
            <button
              onClick={closePopup}
              className="hover:text-gray-500 ease-in-out duration-300"
            >
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
