//Matilde
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { fetchDates, fetchLocations, fetchEvents, createEvent } from "@/api-mappe/EventsApiKald";


const Input = ({ label, register, required, placeholder, name, error }) => (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
      placeholder={placeholder}
      {...register(name || label, { required })}
              className="w-full rounded-md p-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:primary-red"
    />
    {error && <p className="text-sm text-red-500 mt-1">{error.message || "Påkrævet felt"}</p>}
    </div>
  )
  
  // you can use React.forwardRef to pass the ref too
  const Select = React.forwardRef(({ onChange, onBlur, name, label, placeholder, error, options }, ref) => (
    <div className="flex flex-col">
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}
              className="w-full rounded-md p-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:primary-red">
      <option value="" disabled>
          {placeholder || "Vælg en mulighed"}
        </option>
        {options?.map((option) => {
        const value = typeof option === "string" ? option : option.id;
        const label = typeof option === "string" ? option : option.name || option.label || option.title;
        return (
          <option key={value} value={value} disabled={option.disabled}> 
            {label}
          </option>
        );
      })}
      </select>
      {error && <p className="text-sm text-red-500 mt-1">{error.message || "Påkrævet felt"}</p>}
    </div>
  ))
  

  const Textarea = ({ label, register, required, placeholder, name, error }) => (
    <div className="flex flex-col mb-4">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        {...register(name, { required })}
        rows="4"
        className="w-full rounded-md p-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:primary-red"
      />
    {error && <p className="text-sm text-red-500 mt-1">{error.message || "Påkrævet felt"}</p>}
    </div>
  );

const EventForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();


  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);

  const selectedDate = watch("date");
  const selectedLocation = watch("locationId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedDates, fetchedLocations, fetchedEvents] = await Promise.all([
          fetchDates(),
          fetchLocations(),
          fetchEvents(),
        ]);
        setDates(fetchedDates);
        setLocations(fetchedLocations);
        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Fejl ved hentning af data:", err);
      }
    };

    fetchData();
  }, []);

    // Tjekker om en lokation er optaget på en given dato
    const isLocationOccupied = (locationId, date) => {
        return events.some(event => event.locationId === locationId && event.date === date);
      };
    
      // Tjekker om en dato er optaget på en given lokation
      const isDateOccupied = (date, locationId) => {
        return events.some(event => event.date === date && event.locationId === locationId);
      };
    
      // Vi laver arrays med disabled flag på options
      const dateOptions = dates.map(date => ({
        id: date,
        name: date,
        disabled: selectedLocation ? isDateOccupied(date, selectedLocation) : false
      }));

      const locationOptions = locations.map(loc => ({
        id: loc.id,
        name: loc.name,
        disabled: selectedDate ? isLocationOccupied(loc.id, selectedDate) : false
      }));
      
      const onSubmit = async (data) => {
        try {
          const result = await createEvent(data);
          console.log("Event oprettet:", result);
          // fx reset form eller vis besked
        } catch (error) {
          console.error("Fejl ved oprettelse:", error);
          console.log("SENDES TIL API:", data);
        }
      };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-fit">
            <Select label="Dato:" name="date" options={dateOptions} placeholder="Vælg en dato" {...register("date", { required: "Dato skal vælges" })} error={errors.date} />
            {/* <Input label="Tidspunkt:" placeholder="Tidspunkt for event..." register={register} required={{ value: true, message: "Tidspunkt skal udfyldes" }} error={errors.time} /> */}
            <Select label="Lokation:" name="locationId" options={locationOptions} placeholder="Vælg en lokation" {...register("locationId", { required: "Lokation skal vælges" })} error={errors.locationId} />
            <Input label="Event Navn:" name="title" placeholder="Navn på event..." register={register} required={{ value: true, message: "Navn skal udfyldes" }} error={errors.title} />
            <Textarea label="Beskrivelse:" name="description" placeholder="Event beskrivelse..." register={register} required={{ value: true, message: "Beskrivelse skal udfyldes" }} error={errors.description} />
            <Button variant="tertiary" type="submit">Gem Kladde</Button>
            <Button variant="CTA" type="submit">Opret Event</Button>
        </form>
      )
};

export default EventForm;
