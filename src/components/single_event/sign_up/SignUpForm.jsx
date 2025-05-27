"use client";
//Maja
import { useRouter, useParams } from "next/navigation";
import { set, useForm } from "react-hook-form";
import transferReservationInformation from "@/app/store/reservationInformation";
import { useEffect, useRef, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { fetchEventById, bookTickets } from "../../../api-mappe/EventsApiKald";
import Button from "@/components/Button";

const SignUpForm = () => {
  const { eventId } = useParams();
  const router = useRouter();
  const { register, getValues, trigger, setValue, formState } = useForm();
  const { errors } = formState;
  const setReservation = transferReservationInformation(
    (state) => state.setReservation
  );
  const formRef = useRef();
  const [shake, setShake] = useState(false);
  const [showError, setShowError] = useState(false);
  const [billetter, setBilletter] = useState(1);
  const [totalTickets, setTotalTickets] = useState(null);
  const [bookedTickets, setBookedTickets] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Event, setEvent] = useState({});
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Henter event data fra api-mappen
  useEffect(() => {
    const fetchEvent = async () => {
      const data = await fetchEventById(eventId);
      setTotalTickets(data.totalTickets);
      setBookedTickets(data.bookedTickets);
      setEvent(data);
    };
    if (eventId) fetchEvent();
  }, [eventId]);

  // Opdaterer react hook form når antal billetter ændres
  const handleChange = (val) => {
    if (val < 1) return;
    setBilletter(val);
    setValue("billetter", val, { shouldValidate: true });
  };

  // Funktionen når "bekræft reservation" trykkes
  const handleConfirm = async (e) => {
    e.preventDefault();
    const valid = await trigger();
    if (!valid) {
      setShowError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setShowError(false);
    setIsSubmitting(true);
    const values = getValues();

    try {
      // Book billetter
      console.log("THIS IS EVENT:", Event);
      console.log(bookedTickets, "er antal billetter der bookes");

      await Promise.all([
        bookTickets(eventId, {
          ...Event,
          bookedTickets: bookedTickets + billetter,
        }),
        wait(1000),
      ]);

      // Send bekræftelsesmail
      await fetch("/api/sendConfirmation", {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email, // brugerens mail fra inputfeltet
          navn: values.navn,
          billetter: billetter,
          eventId: eventId,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("MAIL API RESPONSE:", data));

      setReservation(values);
      router.push(`/events/${eventId}/tickets`);
    } catch (error) {
      setShowError(true);
      // evt. vis en fejlbesked til brugeren
    }
  };

  return (
    <form
      ref={formRef}
      className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-xl px-8 py-6 m-8 max-w-sm w-full mx-auto flex flex-col"
      onSubmit={handleConfirm}
    >
      <h3 className="font-semibold text-center text-lg mb-6">
        Tilmeld dig gratis
      </h3>

      {/*input felt der har plus og minus til billet antal fungerer lidt bedre */}
      <div className="mb-4">
        <label htmlFor="billetter" className="block text-sm mb-1">
          Antal billetter:
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="minus"
            onClick={() => handleChange(billetter - 1)}
            className="p-3 text-primary-red rounded-md bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)]  hover:bg-primary-red hover:text-white transition"
          >
            <FiMinus />
          </button>
          <span
            className={`w-60 text-center rounded-md p-2 bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] ${
              errors.billetter && "border-primary-red"
            } ${shake && errors.billetter ? "animate-shake" : ""}`}
            style={{ minWidth: "3rem", display: "inline-block" }}
          >
            {billetter}
          </span>
          <button
            type="button"
            aria-label="plus"
            onClick={() => handleChange(billetter + 1)}
            disabled={
              totalTickets !== null &&
              bookedTickets !== null &&
              billetter >= totalTickets - bookedTickets
            }
            className="p-3 text-primary-red rounded-md bg-white shadow-[0_0_10px_rgba(0,0,0,0.1)] hover:bg-primary-red hover:text-white transition"
          >
            <FiPlus />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="navn" className="block text-sm mb-1">
          Navn på reservation:
        </label>
        <input
          type="text"
          id="navn"
          placeholder="Dit navn..."
          {...register("navn", { required: true })}
          className={`w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-primary-red ${
            errors.navn && "border-primary-red"
          } ${shake && errors.navn ? "animate-shake" : ""}`}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm mb-1">
          Din mail:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Din mail..."
          {...register("email", {
            required: true,
          })}
          className={`w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-primary-red ${
            errors.email && "border-primary-red"
          } ${shake && errors.email ? "animate-shake" : ""}`}
        />
      </div>

      {showError && (
        <div className="text-primary-red text-center text-xs mb-2">
          Udfyld alle felter korrekt
        </div>
      )}

      {/* Her vises hvor mange billetter der er tilbage */}
      <div className="text-center text-sm text-gray-600 mb-4">
        {totalTickets !== null && bookedTickets !== null ? (
          <>
            {`Der er ${totalTickets - bookedTickets} `}
            {totalTickets - bookedTickets === 1 ? "billet" : "billetter"}{" "}
            tilbage
          </>
        ) : (
          "Indlæser antal billetter..."
        )}
      </div>

      {/* <button type="submit" className="w-full bg-primary-red text-white py-2 rounded-md hover:bg-red-700 transition block text-center">
        Bekræft reservation
      </button> */}
      <Button
        variant="CTA"
        type="submit"
        loading={isSubmitting}
        loadingText="Bekræfter reservation..."
      >
        Bekræft reservation
      </Button>
    </form>
  );
};

//billet antal i bunden vises ikke pludselig

export default SignUpForm;
