//Matilde og Katinka

import ArtworkList from "@/components/edit_create_event/ArtworkList";
//import EventForm from "@/components/edit_create_event/EventForm";

export default function Page() {
  return (
    <div className="grid sm:grid-cols-2">
      <h1>Opret Events</h1>
      <div>
        {/* <div className="grid grid-cols-[1fr_5px_2fr] gap-4"> */}
        {/* <EventForm></EventForm> */}
        <span className="border-l-2 border-black"></span>
        <ArtworkList />
      </div>
    </div>
  );
}
