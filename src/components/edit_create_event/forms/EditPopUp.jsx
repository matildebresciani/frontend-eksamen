import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEventFormLogic } from "./eventFormsLogic";
import { Input, Select, Textarea } from "./FormFields";
import Button from "../../Button";
import PopUpBase from "../../PopUpBaseLayout";
import { RxCross2 } from "react-icons/rx";
import { EditEvent } from "@/api-mappe/EventsApiKald";

const EditEventPopUp = ({ eventToEdit, closePopup, onEditSuccess }) => {
    const { dates, locations, isLocationOccupied, isDateOccupied } = useEventFormLogic();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue,
      } = useForm({
        defaultValues: {
            date: eventToEdit?.date || "",
            locationId: eventToEdit?.location?.id || "",
            title: eventToEdit?.title || "",
            description: eventToEdit?.description || "",
          },
      });
      
      const selectedLocation = watch("locationId");
      const selectedDate = watch("date");

      const locationId = eventToEdit?.location?.id || "";

      useEffect(() => {
        if (eventToEdit) {
          reset({
            date: eventToEdit.date,
            locationId: eventToEdit.location?.id || "",
            title: eventToEdit.title,
            description: eventToEdit.description,
          });
        }
      }, [eventToEdit, reset]);
      

    
      const dateOptions = dates.map((date) => ({
        id: date,
        name: date,
        disabled: selectedLocation ? isDateOccupied(date, selectedLocation) && date !== eventToEdit.date : false,
      }));

      
    
      const locationOptions = locations.map((loc) => ({
        id: loc.id,
        name: `${loc.name} (${loc.address})`,
        disabled: selectedDate ? isLocationOccupied(loc.id, selectedDate) && loc.id !== locationId : false,
      }));

      const onSubmit = async (data) => {
        try {
          const updatedEvent = await EditEvent(eventToEdit.id, data); // Patch kald
          onEditSuccess(updatedEvent); // Sender opdateret event til forælder
          console.log("Data:", data);
        } catch (error) {
          console.error("Error updating event:", error);
        }
      };
    return ( <PopUpBase>
        <div className="flex justify-end">
        <button onClick={closePopup} className="hover:text-gray-500 ease-in-out duration-300">
        <RxCross2></RxCross2>
        </button>
        </div>
        <h4 className="uppercase">Rediger Event</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-fit">
        <Select
          label="Dato:"
          name="date"
          options={dateOptions}
          placeholder="Vælg en dato"
          {...register("date", { required: "Dato skal vælges" })}
          error={errors.date}
        />
        <Select
          label="Lokation:"
          name="locationId"
          options={locationOptions}
          placeholder="Vælg en lokation"
          {...register("locationId", { required: "Lokation skal vælges" })}
          error={errors.locationId}
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
        <Button variant="CTA" type="submit">
          Gem ændringer
        </Button>
      </form>
    </PopUpBase> );
}
 
export default EditEventPopUp;