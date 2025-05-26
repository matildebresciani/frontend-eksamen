import { useEffect, useState } from "react";

export const useArtworksLogic = (
  selectedDate,
  selectedArtworks,
  setSelectedArtworks,
  selectedLocation
) => {
  const [artworks, setArtworks] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;
  const MAX_SELECTION = selectedLocation?.maxArtworks ?? 15;

  // Filtrering
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

  // Bookede værker til valgt dato
  const bookedArtworkIds = events
    .filter((event) => event.date === selectedDate)
    .flatMap((event) => event.artworks);

  const isArtworkBooked = (id) => bookedArtworkIds.includes(id);

  // Udtræk kunstnere, teknikker, materialer alfabetisk
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
    artistsSelected,
    techniquesSelected,
    materialsSelected
  ) => {
    let filtered = [...artworks];

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

  const handleSelectArtist = (artist) => {
    const updated = selectedArtists.includes(artist)
      ? selectedArtists.filter((a) => a !== artist)
      : [...selectedArtists, artist];
    setSelectedArtists(updated);
    applyFilters(updated, selectedTechniques, selectedMaterials);
  };

  const handleSelectTechnique = (technique) => {
    const updated = selectedTechniques.includes(technique)
      ? selectedTechniques.filter((t) => t !== technique)
      : [...selectedTechniques, technique];
    setSelectedTechniques(updated);
    applyFilters(selectedArtists, updated, selectedMaterials);
  };

  const handleSelectMaterial = (material) => {
    const updated = selectedMaterials.includes(material)
      ? selectedMaterials.filter((m) => m !== material)
      : [...selectedMaterials, material];
    setSelectedMaterials(updated);
    applyFilters(selectedArtists, selectedTechniques, updated);
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

  const toggleSelect = (object_number) => {
    setSelectedArtworks((prev) => {
      console.log("Before toggle:", prev.length, prev);
      if (prev.includes(object_number)) {
        return prev.filter((id) => id !== object_number);
      } else if (
        prev.length >= (selectedLocation?.maxArtworks ?? MAX_SELECTION)
      ) {
        console.log("Max reached, cannot add more");
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
    setSelectedArtists([]);
    setSelectedTechniques([]);
    setSelectedMaterials([]);
    setSearchResults(null);
    setCurrentPage(1);
    applyFilters([], [], []);
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
    selectedArtists,
    selectedTechniques,
    selectedMaterials,
    handleSelectArtist,
    handleSelectTechnique,
    handleSelectMaterial,
    toggleSelect,
    selectedArtworksPage,
    setSelectedArtworksPage,
    selectedTotalPages,
    displayedSelectedArtworks,
    handleClearFilters,
    handleSearchResult,
    MAX_SELECTION,
    isArtworkBooked,
    artists,
    techniques,
    materials,
    artworks,
  };
};
