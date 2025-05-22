//Matilde og Katinka

import ArtworkList from "@/components/edit_create_event/ArtworkList";
import EventForm from "@/components/edit_create_event/forms/InputForm";

export default function Page() {
    const [selectedArtworks, setSelectedArtworks] = useState([]);


  return (
    <div>
      <h1>Opret Events</h1>
      <div className="grid grid-cols-[1fr_5px_2fr] gap-4">
        <EventForm selectedArtworks={selectedArtworks}></EventForm>
        <span className="border-l-2 border-black"></span>
        <ArtworkList
        selectedArtworks={selectedArtworks}
          setSelectedArtworks={setSelectedArtworks} />
      </div>
    </div>
  );
}
