"use client";
//Maja
//Her skal der være en besked i toppen om billetter købt/tillykke med køb el.lign. så skal info overføres:
//--> Det der er blevet udfyldt i formularen skal vises som en besked. som lyder:
//------->"Kære [navn på reservation], her er dine billetter til [eventets navn], vi glæder os til at se dig/jer på [adressen] den [dato]."
//mangler at omdanne fetch til import af api-mappen
import Ticket from "./Ticket";
import Image from "next/image";
import transferReservationInformation from "@/app/store/reservationInformation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";

const ReservationMessage = () => {
  const reservation = transferReservationInformation(
    (state) => state.reservation
  );
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      try {
        const res = await fetch(
          `https://server-gititgirls.onrender.com/events/${eventId}`
        );
        if (!res.ok) throw new Error("Event not found");
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!reservation || !event) return <div>Indlæser billetoplysninger...</div>;

  const formattedDate = event ? formatDate(event.date) : "";
  return (
    <div>
      <div className="flex flex-col items-center pb-10">
        <Image
          src="/imgs/monalisa.png"
          alt="lineart af monalisa"
          width={100}
          height={100}
        />
        <div>
          <p className="text-center">
            Kære {reservation.navn}, her er dine billetter til{" "}
            <b>{event.title}</b>, vi glæder os til at se dig/jer på{" "}
            <b>{event.location?.address}</b> | <b>{formattedDate}</b>.
          </p>
        </div>
      </div>
      <div className="max-w-[1000px] mx-auto px-4">
        <p className="mt-5">Se dine billetter her.</p>
        <p className="mb-1">
          Vi sender dem til <b>{reservation.email}</b> hurtigst muligt.
        </p>
        {/*prompt: Hvordan får jeg ticket komponentet til at vise det antal af billetter brugeren har indtastet i SignUpform? */}
        <div className="flex flex-wrap gap-6 justify-center mt-6">
          {Array.from({ length: reservation.billetter || 1 }).map((_, idx) => (
            <Ticket key={idx} eventId={eventId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationMessage;
