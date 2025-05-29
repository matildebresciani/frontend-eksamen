//Primært Katinka, men med rettelser fra Matilde når det kom til debugging

import { useEffect, useState } from "react";
import { fetchEvents } from "@/api-mappe/EventsApiKald";

export const useArtworksLogic = (
  selectedDate,
  selectedArtworks,
  setSelectedArtworks,
  selectedLocation,
  maxSelection,
  excludeEventId
) => {
  const [artworks, setArtworks] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;
  const MAX_SELECTION = maxSelection ?? selectedLocation?.maxArtworks ?? 15;

  // Filtrering
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTechniques, setSelectedTechniques] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // Søgefunktion
  const [searchResults, setSearchResults] = useState(null);

  // Pagination valgte værker
  const [selectedArtworksPage, setSelectedArtworksPage] = useState(1);
  const selectedTotalPages = Math.ceil(
    selectedArtworks.length / ITEMS_PER_PAGE
  );

  const displayedSelectedArtworks = selectedArtworks.slice(
    (selectedArtworksPage - 1) * ITEMS_PER_PAGE,
    selectedArtworksPage * ITEMS_PER_PAGE
  );

  console.log("selectedDate:", selectedDate);
  console.log(
    "events dates:",
    events.map((e) => e.date)
  );

  // Bookede værker til valgt dato
  const formattedDate =
    typeof selectedDate === "string"
      ? selectedDate
      : selectedDate?.toISOString().split("T")[0] ?? null;

  // Funktion til at hente bookede værker for valgt dato, evt. ekskl. et bestemt event (til redigering)
  const getBookedArtworkIds = (excludeEventId = null) => {
    return events
      .filter((event) => {
        // Samme dato og ikke det event vi er ved at redigere
        const sameDate = event.date === formattedDate;
        const notExcluded = excludeEventId ? event.id !== excludeEventId : true;
        return sameDate && notExcluded;
      })
      .flatMap((event) => event.artworks ?? event.artworkIds ?? []);
  };

  // Funktion til at tjekke om et værk er booket
  const isArtworkBooked = (object_number, excludeEventId = null) => {
    const bookedArtworkIds = getBookedArtworkIds(excludeEventId);
    const booked = bookedArtworkIds.includes(object_number);
    console.log(
      `Check artwork ${object_number} booked (exclude: ${excludeEventId}):`,
      booked
    );

    return booked;
  };

  // Udtræk titler, kunstnere, teknikker, materialer alfabetisk
  const titles = Array.from(
    new Set(
      artworks
        .map((artwork) => artwork.titles?.[0]?.title)
        .filter((title) => !!title)
    )
  ).sort();

  const artists = Array.from(
    new Set(
      artworks
        .map((item) => item.production?.[0]?.creator)
        .filter((name) => typeof name === "string" && name.length > 0)
    )
  ).sort();

  const techniques = Array.from(
    new Set(
      artworks
        .flatMap((item) => item.techniques || [])
        .filter((t) => typeof t === "string" && t.length > 0)
    )
  ).sort();

  const materials = Array.from(
    new Set(
      artworks
        .flatMap((item) => item.materials || [])
        .filter((m) => typeof m === "string" && m.length > 0)
    )
  ).sort();

  // Filtreringsfunktion
  const applyFilters = (
    titlesSelected,
    artistsSelected,
    techniquesSelected,
    materialsSelected
  ) => {
    let filtered = [...artworks];

    if (titlesSelected.length > 0) {
      filtered = filtered.filter((art) =>
        titlesSelected.includes(art.titles?.[0]?.title)
      );
    }

    if (artistsSelected.length > 0) {
      filtered = filtered.filter((art) =>
        artistsSelected.includes(art.production?.[0]?.creator)
      );
    }

    if (techniquesSelected.length > 0) {
      filtered = filtered.filter((art) =>
        (art.techniques || []).some((t) => techniquesSelected.includes(t))
      );
    }

    if (materialsSelected.length > 0) {
      filtered = filtered.filter((art) =>
        (art.materials || []).some((m) => materialsSelected.includes(m))
      );
    }

    setFilteredArtworks(filtered);
    setCurrentPage(1);
    setSearchResults(null);
  };

  const handleSelectTitle = (title) => {
    const updated = selectedTitles.includes(title)
      ? selectedTitles.filter((a) => a !== title)
      : [...selectedTitles, title];
    setSelectedTitles(updated);
    applyFilters(
      updated,
      selectedArtists,
      selectedTechniques,
      selectedMaterials
    );
  };

  const handleSelectArtist = (artist) => {
    const updated = selectedArtists.includes(artist)
      ? selectedArtists.filter((a) => a !== artist)
      : [...selectedArtists, artist];
    setSelectedArtists(updated);
    applyFilters(
      selectedTitles,
      updated,
      selectedTechniques,
      selectedMaterials
    );
  };

  const handleSelectTechnique = (technique) => {
    const updated = selectedTechniques.includes(technique)
      ? selectedTechniques.filter((t) => t !== technique)
      : [...selectedTechniques, technique];
    setSelectedTechniques(updated);
    applyFilters(selectedTitles, selectedArtists, updated, selectedMaterials);
  };

  const handleSelectMaterial = (material) => {
    const updated = selectedMaterials.includes(material)
      ? selectedMaterials.filter((m) => m !== material)
      : [...selectedMaterials, material];
    setSelectedMaterials(updated);
    applyFilters(selectedTitles, selectedArtists, selectedTechniques, updated);
  };

  // Toggle udvælgelse med max grænse og tjek booket
  //   const toggleSelect = (object_number) => {
  //     setSelectedArtworks((prev) =>
  //       prev.includes(object_number)
  //         ? prev.filter((id) => id !== object_number)
  //         : prev.length < (selectedLocation?.maxArtworks ?? MAX_SELECTION)
  //         ? [...prev, object_number]
  //         : prev
  //     );
  //     setSelectedArtworksPage(1);
  //   };

  //   const toggleSelect = (object_number) => {
  //     setSelectedArtworks((prev) => {
  //       console.log("Before toggle:", prev.length, prev);
  //       if (prev.includes(object_number)) {
  //         return prev.filter((id) => id !== object_number);
  //       } else if (
  //         prev.length >= (selectedLocation?.maxArtworks ?? MAX_SELECTION)
  //       ) {
  //         console.log("Max reached, cannot add more");
  //         return prev;
  //       } else {
  //         return [...prev, object_number];
  //       }
  //     });
  //     setSelectedArtworksPage(1);
  //   };

  const toggleSelect = (object_number) => {
    setSelectedArtworks((prev) => {
      const isAlreadySelected = prev.includes(object_number);

      // Hvis værket er booket og ikke allerede valgt, må det ikke tilføjes
      if (
        !isAlreadySelected &&
        isArtworkBooked(object_number, excludeEventId)
      ) {
        console.log(
          "Dette værk er allerede booket på denne dato og kan ikke vælges."
        );
        return prev;
      }

      console.log("Trykker på:", object_number);
      console.log("Allerede valgt:", prev);

      if (isAlreadySelected) {
        console.log("Fjerner værk:", object_number);
        return prev.filter((id) => id !== object_number);
      } else if (prev.length >= MAX_SELECTION) {
        console.log("Max antal værker nået, kan ikke tilføje flere");
        return prev;
      } else {
        return [...prev, object_number];
      }
    });

    setSelectedArtworksPage(1);
  };

  // Hent kunstværker ved mount
  //   useEffect(() => {
  //     const fetchArtworks = async () => {
  //       try {
  //         const res = await fetch(
  //           "https://api.smk.dk/api/v1/art/search?keys=modernisme&offset=0&rows=100"
  //         );
  //         const data = await res.json();
  //         const items = data.items || [];

  //         setArtworks(items);
  //         setFilteredArtworks(items);
  //       } catch (error) {
  //         console.error("Fejl ved hentning af billeder:", error);
  //       }
  //     };
  //     fetchArtworks();
  //   }, []);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch(
          "https://api.smk.dk/api/v1/art/search?keys=modernisme&offset=0&rows=100"
        );

        if (!res.ok) {
          // Her kan du logge statuskode og tekst, hvis ikke OK
          const text = await res.text(); // Læs det som tekst for debugging
          console.error("Response error:", res.status, text);
          throw new Error(`Network response was not ok: ${res.status}`);
        }

        const data = await res.json();
        const items = data.items || [];
        console.log("SMK items:", items);

        setArtworks(items);
        setFilteredArtworks(items);
      } catch (error) {
        console.error("Fejl ved hentning af billeder:", error);
      }
    };
    fetchArtworks();
  }, []);

  // Hent events (for bookede værker)
  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Fejl ved hentning af events:", error);
      }
    };
    getEvents();
  }, []);

  //   useEffect(() => {
  //     const fetchEvents = async () => {
  //       // TODO: Tilpas endpoint til events, hvis nødvendigt
  //       try {
  //         const res = await fetch("/api/events");
  //         const data = await res.json();
  //         setEvents(data);
  //       } catch (error) {
  //         console.error("Fejl ved hentning af events:", error);
  //       }
  //     };
  //     fetchEvents();
  //   }, []);

  const isSearchActive = searchResults !== null;
  const artworksToPaginate = isSearchActive ? searchResults : filteredArtworks;
  const totalPages = Math.ceil(artworksToPaginate.length / ITEMS_PER_PAGE);

  // Pagination side justering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [artworksToPaginate, currentPage, totalPages]);

  // Slice til visning
  const displayedArtworks = artworksToPaginate.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClearFilters = () => {
    setSelectedTitles([]);
    setSelectedArtists([]);
    setSelectedTechniques([]);
    setSelectedMaterials([]);
    setSearchResults(null);
    setCurrentPage(1);
    applyFilters([], [], [], []);
  };

  const handleSearchResult = (results) => {
    if (Array.isArray(results) && results.length > 0) {
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
    setCurrentPage(1);
  };

  return {
    artworks,
    filteredArtworks,
    displayedArtworks,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedTitles,
    selectedArtists,
    selectedTechniques,
    selectedMaterials,
    handleSelectTitle,
    handleSelectArtist,
    handleSelectTechnique,
    handleSelectMaterial,
    toggleSelect,
    selectedArtworksPage,
    // setSelectedTitles,
    setSelectedArtworksPage,
    selectedTotalPages,
    displayedSelectedArtworks,
    handleClearFilters,
    handleSearchResult,
    MAX_SELECTION,
    isArtworkBooked,
    titles,
    artists,
    techniques,
    materials,
  };
};
