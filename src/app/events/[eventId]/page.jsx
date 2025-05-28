"use client"

// Maja
// import Gallery from "@/components/single_event/art_gallery/Gallery";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TestGallery from "@/components/single_event/art_gallery/TestGallery";
import Eventinfo from "@/components/single_event/EventInfo";
import SignUpForm from "@/components/single_event/sign_up/SignUpForm";

export default function Eventpage() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
  
    useEffect(() => {
      const fetchEvent = async () => {
        const res = await fetch(`https://server-gititgirls.onrender.com/events/${eventId}`);
        const data = await res.json();
        setEvent(data);
      };
  
      if (eventId) fetchEvent();
    }, [eventId]);

    const handleEdit = (updatedEvent) => {
        console.log("Updated event modtaget fra API:", updatedEvent);
        setEvent(updatedEvent);
      };
      
  
    if (!event) return <div>Loading...</div>;
  
    return (
      <div>
        <TestGallery event={event}  eventId={eventId} />
        <Eventinfo event={event} setEvent={setEvent} onEdit={handleEdit} />
        <SignUpForm />
      </div>
    );
  }
