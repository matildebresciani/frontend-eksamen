"use client";

//Matilde

import React from "react";

//Input komponent, register kommer fra useForm og det kan kontrolleres direkte af RHF
export const Input = ({
  label,
  register, // RHF funktion, der "registrerer" input til RHF
  required, // Valideringsregel - om feltet skal være påkrævet
  placeholder,
  name,
  error,
}) => (
  <div className="flex flex-col">
    <label>{label}</label>
    <input
      placeholder={placeholder}
      // Her kalder vi register på name, og fortæller at det er required, så RHF kan styre input
      {...register(name || label, { required })}
      className={`w-full rounded-md p-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:primary-red ${
        error ? "animate-shake" : ""
      }`}
    />
    {error && (
      <p className="!text-sm !text-red-500 mt-1">
        {error.message || "Påkrævet felt"}
      </p>
    )}
  </div>
);

//Debug prompt: Når jeg har fetchet datoer og lokationer, viser den datoerne som tomme, hvor ligger problemet og hvordan kan jeg fikse det
//Prompt: Hvordan tilpasser jeg mit select komponent til at bruge controller fra react hook form

// Til forskel fra Input, er Select ofte en "kontrolleret komponent",
// og her bruger vi props som onChange, onBlur, value, ref fra RHF Controller, så den kan styres helt af RHF.
export const Select = ({
  onChange,    // Funktion der kaldes når brugeren vælger en mulighed - gives af Controller fra RHF
  onBlur,     // Funktion der kaldes når brugeren forlader feltet - gives af Controller
  name,       // Feltets navn i formularen (unik nøgle)
  label,      // Label tekst for dropdown
  placeholder,// Tekst som vises før noget vælges
  error,      // Fejl-objekt fra RHF, hvis validering fejler
  options,    // Liste af muligheder der vises i dropdown (kan være array af strings eller objekter)
  value,      // Den aktuelle værdi valgt i dropdown - gives af Controller
  ref,        // Reference til DOM-elementet, bruges af RHF til at registrere feltet
}) => (
  <div className="flex flex-col">
    <label>{label}</label>
    <select
      aria-label={label}  // Tilgængelighed: fortæller hvad dropdown handler om
      name={name}         // Feltets navn - vigtigt for RHF at identificere input
      ref={ref}           // RHF bruger denne ref til at forbinde elementet med sin interne styring
      onChange={onChange} // Når brugeren vælger ny option, opdateres værdien i RHF via denne funktion
      value={value}       // Den aktuelle værdi, styret af RHF (giver hvad der skal være valgt)
      onBlur={onBlur}     // Når brugeren forlader feltet, bruges til fx validering og opdatering i RHF
      className={`w-full rounded-md p-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:primary-red ${
        error ? "animate-shake" : ""
      }`}
    >
      {/* Placeholder-option som ikke kan vælges */}
      <option value="" disabled>
        {placeholder || "Vælg en mulighed"}
      </option>
      {options?.map((option) => {
        // Hvis option er en string, bruges den som value (til datoer fordi de ikke har id, da de er en string), 
        // ellers bruges option.id (bruges til locations, fordi de har et id, da det er et objekt)
        //string til dato, og id til lokation
        const value = typeof option === "string" ? option : option.id;

        // Den synlige tekst i dropdown
        // Hvis option er en string, viser den det (til dato)
        // Hvis option er et objekt, viser den "name" (eller label/title) (til lokation)
        const label =
          typeof option === "string"
            ? option
            : option.name || option.label || option.title;
        return (
          <option key={value} value={value} disabled={option.disabled}>
            {label}
          </option>
        );
      })}
    </select>
    {error && (
      <p className="!text-sm !text-red-500 mt-1">
        {error.message || "Påkrævet felt"}
      </p>
    )}
  </div>
);

// Ligner Input-komponenten - bruger register fra RHF til at forbinde textarea med formularen
export const Textarea = ({
  label,
  register,
  required,
  placeholder,
  name,
  error,
}) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={name}>{label}</label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      {...register(name, { required })}
      rows="4"
      className={`w-full rounded-md p-2 shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:primary-red ${
        error ? "animate-shake" : ""
      }`}
    />
    {error && (
      <p className="!text-sm !text-red-500 mt-1">
        {error.message || "Påkrævet felt"}
      </p>
    )}
  </div>
);
