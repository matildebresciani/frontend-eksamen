//Matilde
//Brugt AI til at sørge for form henter data og præudfylder form med det fra eventet
//Debug prompt: Hvordan får jeg den til at vise og gemme den valgte dato og lokation fra eventet i mine select komponenter 
// gennem value, giver det mening at bruge Controller fra RHF?

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Textarea } from "./FormFields";
import { formatDate } from "@/utils/formatDate";

const EditEventForm = ({
  eventToEdit,
  dates,
  locations,
  isDateOccupied,
  isLocationOccupied,
  formId,
  onSubmitData,
  onLocationChange,
  selectedDate,
  setSelectedDate,
}) => {
  // Initialiserer react-hook-form med default værdier fra eventet
  const {
    register, //bruges til titel og beskrivelse
    handleSubmit,
    watch, //overvåger felter hvis de ændres
    control, //til controller baseret elementer (select)
    formState: { errors }, //valideringsfejl
    reset, //nulstiller form ved ny eventToEdit
  } = useForm({
    //Default values bruges ved første indlæsning (mount) - virker kun én gang
    //Kan teknisk set fjernes, for den nyeste data hentes også ved reset
    defaultValues: {
      date: eventToEdit?.date || "",
      locationId: eventToEdit?.locationId || "",
      title: eventToEdit?.title || "",
      description: eventToEdit?.description || "",
    },
  });

  //"Overvåger" valgte værdier i form
  const selectedLocation = watch("locationId");
  const watchedDate = watch("date");

  //Reset sætter formularen til den seneste data fra eventet (f.eks. hvis popup åbnes med nyt event)
  useEffect(() => {
    if (eventToEdit) {
      //Opdateres hvis der har været en ændring i data
      reset({
        date: eventToEdit.date,
        locationId: eventToEdit.locationId || "",
        title: eventToEdit.title,
        description: eventToEdit.description,
      });
    }
  }, [eventToEdit, reset]);

    // Opdaterer parent-komponentens (edit pop up) lokation state når brugeren vælger ny lokation
  useEffect(() => {
    if (onLocationChange) {
      onLocationChange(selectedLocation);
    }
  }, [selectedLocation, onLocationChange]);

  // Sikrer at parentens (edit pop up) `selectedDate` bliver opdateret hvis brugeren vælger ny dato
  useEffect(() => {
    if (selectedDate && watchedDate !== selectedDate) {
      setSelectedDate(watchedDate);
    }
  }, [watchedDate, setSelectedDate, selectedDate]);

  // Lav options til select med disabled baseret på optagethed og ikke den nuværende event's data
  const dateOptions = dates.map((date) => ({ //dates kommer fra parent
    id: date, //enkelt dato
    name: formatDate(date), //fra format date fil - navnet på datoen
    disabled:
      selectedLocation && //fra watch
      isDateOccupied(date, selectedLocation) && //funktion fra parent
      date !== eventToEdit.date, //sørger for eventets oprindelige dato ikke disables
  }));

    // Generér lokation-options, disable hvis lokationen er optaget på valgt dato
    // (men ikke hvis det er eventets egen)
  const locationOptions = locations.map((loc) => ({ //locations kommer fra parent
    id: loc.id, //en enkelt lokation
    name: `${loc.name} (${loc.address})`, //navnet der står i dropdown
    maxArtworks: loc.maxArtworks, //henter maxArtworks fra lokationen
    disabled:
      selectedDate &&
      isLocationOccupied(loc.id, selectedDate) && //funktion fra parent
      loc.id !== eventToEdit.locationId, //sørger for eventets oprindelige lokation ikke disables
  }));

  //Gammel onSubmit fra før submit knap blev rykket op i parent
  //   const onSubmit = async (data) => {
  //     setIsSubmitting(true);
  //     try {
  //       const [updatedEvent] = await Promise.all([
  //         EditEvent(eventToEdit.id, data),
  //         wait(1000),
  //       ]);
  //       onEditSuccess(updatedEvent);
  //     } catch (error) {
  //       console.error("Error updating event:", error);
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  const onSubmit = (data) => {
    onSubmitData(data); // sender data op til popup som håndterer PATCH request
  };

  return (
    <form
      id={formId} // Gør det muligt at trigge submit via knap udenfor form (i edit pop up)
      onSubmit={handleSubmit(onSubmit)} //RHF submit handler
      className="flex flex-col gap-4 w-full p-2 pr-6"
    >
      <Controller
        name="date" // Navnet på feltet i formen (skal matche formState)
        control={control} // Controller får en "fjernbetjening" fra RHF til at styre feltet og registrere input
        rules={{ required: "Dato skal vælges" }} // Valideringsregel: feltet er påkrævet, og denne fejltekst vises
        render={({ field, fieldState }) => ( // Renderfunktionen får 'field' med værdier + funktioner til input, og 'fieldState' med fejl-info
          <Select
            label="Dato:" // Label der vises over select-boksen
            placeholder="Vælg en dato" // Placeholder-tekst når intet er valgt
            options={dateOptions} // Muligheder til dropdown'en — lavet ovenfor baseret på datoer
            error={fieldState.error} // Hvis der er valideringsfejl, vis den i Select
            {...field} // Giv Select det, den skal bruge for at kunne opdatere værdier osv.
          />
        )}
      />

      <Controller
        name="locationId"
        control={control}
        rules={{ required: "Lokation skal vælges" }}
        render={({ field, fieldState }) => (
          <Select
            label="Lokation:"
            placeholder="Vælg en lokation"
            options={locationOptions}
            error={fieldState.error}
            {...field}
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
    </form>
  );
};

export default EditEventForm;
