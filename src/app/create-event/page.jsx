//Matilde og Katinka

import ArtworkList from "@/components/edit_create_event/ArtworkList";
import EventForm from "@/components/edit_create_event/InputForm";

export default function Page() {
  return <div>
    <h1>Opret Events</h1>
    <div className="grid grid-cols-[1fr_2fr]">
        <EventForm></EventForm>
        <ArtworkList></ArtworkList>
    </div>
  </div>;
}