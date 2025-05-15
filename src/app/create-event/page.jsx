//Matilde og Katinka

import ArtworkList from "@/components/edit_create_event/ArtworkList";
import EventForm from "@/components/edit_create_event/InputForm";

export default function Page() {
  return (
    <div>
      <h1>Opret Events</h1>
      <div className="grid grid-cols-[1fr_5px_2fr] gap-4">
        <EventForm></EventForm>
        <span className="border-l-2 border-black"></span>
        <ArtworkList />
      </div>
    </div>
  );
}
