//Matilde
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { fetchDates, fetchLocations, createEvent } from "@/api-mappe/EventsApiKald";


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
        {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name || option.label || option.date || option.title}
        </option>
      ))}
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
        formState: { errors },
      } = useForm();


  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedDates, fetchedLocations] = await Promise.all([
          fetchDates(),
          fetchLocations()
        ]);
        setDates(fetchedDates);
        setLocations(fetchedLocations);
      } catch (err) {
        console.error("Fejl ved hentning af data:", err);
      }
    };

    fetchData();
  }, []);
      
      const onSubmit = async (data) => {
        try {
          const result = await createEvent(data);
          console.log("Event oprettet:", result);
          // fx reset form eller vis besked
        } catch (error) {
          console.error("Fejl ved oprettelse:", error);
        }
      };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-fit">
            <Select label="Dato:" name="date" options={dates} placeholder="Vælg en dato" {...register("date", { required: "Dato skal vælges" })} error={errors.date} />
            <Input label="Tidspunkt:" placeholder="Tidspunkt for event..." register={register} required={{ value: true, message: "Tidspunkt skal udfyldes" }} error={errors.time} />
            <Select label="Lokation:" name="locationId" options={locations} placeholder="Vælg en lokation" {...register("locationId", { required: "Lokation skal vælges" })} error={errors.locationId} />
            <Input label="Event Navn:" name="title" placeholder="Navn på event..." register={register} required={{ value: true, message: "Navn skal udfyldes" }} error={errors.title} />
            <Textarea label="Beskrivelse:" name="description" placeholder="Event beskrivelse..." register={register} required={{ value: true, message: "Beskrivelse skal udfyldes" }} error={errors.description} />
            <Button variant="tertiary" type="submit">Gem Kladde</Button>
            <Button variant="CTA" type="submit">Opret Event</Button>
        </form>
      )
};

export default EventForm;
