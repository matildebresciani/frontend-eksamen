//Matilde
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";

const Input = ({ label, register, required, placeholder, name }) => (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
      placeholder={placeholder}
      {...register(name || label, { required })}
              className="w-full rounded-md p-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:primary-red"
    />
    </div>
  )
  
  // you can use React.forwardRef to pass the ref too
  const Select = React.forwardRef(({ onChange, onBlur, name, label, placeholder }, ref) => (
    <div className="flex flex-col">
      <label>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}
              className="w-full rounded-md p-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:primary-red">
      <option value="" disabled>
          {placeholder || "Vælg en mulighed"}
        </option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  ))

  const Textarea = ({ label, register, required, placeholder, name }) => (
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
    </div>
  );

const EventForm = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        console.log("Form data:", data);
      };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-fit">
            <Select label="Dato:" name="date" {...register("date")} />
            <Input label="Tidspunkt:" placeholder="Tidspunkt for event..." register={register} required />
            <Select label="Lokation:" name="locationId" {...register("locationId")} />
            <Input label="Event Navn:" name="title" placeholder="Navn på event..." register={register} required />
            <Textarea label="Beskrivelse:" name="description" placeholder="Event beskrivelse..." register={register} required />
            <Button variant="tertiary" type="submit">Gem Kladde</Button>
            <Button variant="CTA" type="submit">Opret Event</Button>
        </form>
      )
};

export default EventForm;
