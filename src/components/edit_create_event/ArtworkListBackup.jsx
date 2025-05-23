//Katinka
//Forbedringer:
//1. Man skal kunne bladre igennem værkerne i venstre kolonne (pagination)
//2. Denne skal kobles op imod opret event form og opdatere hvor mange værker man kan vælge
//Ekstra: Man skal ikke kunne vælge værker der allerede er booket til andre event med samme dato!

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import FilterBtn from "./FilterBtn";
import SearchBar from "./SearchBar";
import { IoCheckmark } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import Button from "../Button";
import { motion } from "motion/react";

const ITEMS_PER_PAGE = 12;
const MAX_SELECTION = 15;

const ArtworkList = ({selectedArtworks, setSelectedArtworks }) => {
  const [artworks, setArtworks] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
//   const [selectedArtworks, setSelectedArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //Filtrering
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTechniques, setSelectedTechniques] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  //Søgefunktion
  const [searchResults, setSearchResults] = useState(null);
  //Pagination
  const [selectedArtworksPage, setSelectedArtworksPage] = useState(1);
  const selectedTotalPages = Math.ceil(
    selectedArtworks.length / ITEMS_PER_PAGE
  );
  const displayedSelectedArtworks = selectedArtworks.slice(
    (selectedArtworksPage - 1) * ITEMS_PER_PAGE,
    selectedArtworksPage * ITEMS_PER_PAGE
  );

  const bookedArtworkIds = events
  .filter(event => event.date === selectedDate)
  .flatMap(event => event.artworks);

    const isArtworkBooked = (id) => bookedArtworkIds.includes(id);

  // Udtrækker kunstnere alfabetisk
  const artists = Array.from(
    new Set(
      artworks
        .map((item) => item.production?.[0]?.creator)
        .filter((name) => typeof name === "string" && name.length > 0)
    )
  ).sort();

  // Udtrækker teknikker
  const techniques = Array.from(
    new Set(
      artworks
        .flatMap((item) => item.techniques || [])
        .filter((t) => typeof t === "string" && t.length > 0)
    )
  ).sort();

  // Udtrækker materialer
  const materials = Array.from(
    new Set(
      artworks
        .flatMap((item) => item.materials || [])
        .filter((m) => typeof m === "string" && m.length > 0)
    )
  ).sort();

  //Filtreringsfunktion
  const applyFilters = (artists, techniques, materials) => {
    let filtered = [...artworks];

    if (artists.length > 0) {
      filtered = filtered.filter((art) =>
        artists.includes(art.production?.[0]?.creator)
      );
    }

    if (techniques.length > 0) {
      filtered = filtered.filter((art) =>
        (art.techniques || []).some((t) => techniques.includes(t))
      );
    }

    if (materials.length > 0) {
      filtered = filtered.filter((art) =>
        (art.materials || []).some((m) => materials.includes(m))
      );
    }

    setFilteredArtworks(filtered);
    setCurrentPage(1);
    setSearchResults(null); // Ryd tidligere søgning
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

  const toggleSelect = (id) => {
    let updated;
    if (selectedArtworks.includes(id)) {
      updated = selectedArtworks.filter((aid) => aid !== id);
    } else if (selectedArtworks.length < MAX_SELECTION) {
      updated = [...selectedArtworks, id];
    } else {
      return; // forhindrer over max
    }

    setSelectedArtworks(updated);
    setSelectedArtworksPage(1); // reset pagination for valgte værker
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch(
          "https://api.smk.dk/api/v1/art/search?keys=modernisme&offset=0&rows=100"
        );
        const data = await res.json();
        const items = data.items || [];

        setArtworks(items);
        setFilteredArtworks(items);
      } catch (error) {
        console.error("Fejl ved hentning af billeder:", error);
      }
    };

    fetchArtworks();
  }, []);

  const isSearchActive = searchResults !== null;
  const artworksToPaginate = isSearchActive ? searchResults : filteredArtworks;
  const totalPages = Math.ceil(artworksToPaginate.length / ITEMS_PER_PAGE);

  const displayedArtworks = artworksToPaginate.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClearFilters = () => {
    setSelectedArtists([]);
    setSelectedTechniques([]);
    setSelectedMaterials([]);
    setSearchResults(null); // vigtigt!
    setCurrentPage(1); // dette manglet muligvis
    applyFilters([], [], []);
  };

  //Søgefunktion
  const handleSearchResult = (artwork) => {
    if (Array.isArray(artwork) && artwork.length > 0) {
      setSearchResults(artwork);
    } else {
      setSearchResults(null); // fallback til filtreret visning
    }
    setCurrentPage(1);
  };

  //NYT
  useEffect(() => {
    const newTotalPages = Math.ceil(artworksToPaginate.length / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages) {
      setCurrentPage(1);
    }
  }, [artworksToPaginate, currentPage]);

  return (
    <div className="flex flex-col sm:flex-row gap-8">
      {/* Venstre kolonne - Galleriet */}
      <div className="flex-1 max-w-[600px]">
        <div className="flex flex-col max-w-[350px] sm:max-w-[500px]">
          <div>
            <h5>Vælg op til {MAX_SELECTION} værker:</h5>
            <p>
              Du kan vælge {MAX_SELECTION - selectedArtworks.length} værker mere
            </p>
          </div>

          {/* <SearchBar
            artworks={artworks}
            onLiveSearch={(results) => {
              setSearchResults(results?.length ? results : null);
              setCurrentPage(1);
              handleSearchResult(results); //Gør at man kan lukke dropdown, men fucker up søgefunktionen!
            }}
            onSelectSuggestion={(selected) => {
              setSearchResults(selected?.length ? selected : null);
              setCurrentPage(1);
              handleSearchResult(selected); //Gør at man kan lukke dropdown, men fucker up søgefunktionen!
            }}
          /> */}
          <SearchBar
            artworks={artworks}
            onLiveSearch={handleSearchResult}
            onSelectSuggestion={handleSearchResult}
          />

          <div className="sm:flex sm:justify-between sm:items-center  mt-5">
            <FilterBtn
              artists={artists}
              techniques={techniques}
              materials={materials}
              selectedArtists={selectedArtists}
              selectedTechniques={selectedTechniques}
              selectedMaterials={selectedMaterials}
              onSelectArtist={handleSelectArtist}
              onSelectTechnique={handleSelectTechnique}
              onSelectMaterial={handleSelectMaterial}
              onClearFilters={handleClearFilters}
              //   artworks={artworks}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-5">
            {displayedArtworks.map((artwork) => {
              const imageUrl = artwork.image_thumbnail || "/dummy4.jpg";
              const title = artwork.titles?.[0]?.title || "Uden titel";
              const isSelected = selectedArtworks.includes(artwork.id);

              return (
                <div key={artwork.id}>
                  <div
                    className="relative cursor-pointer group"
                    onClick={() => toggleSelect(artwork.id)}
                  >
                    {isSelected && (
                      <div
                        className="absolute inset-0 z-5 pointer-events-none rounded"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                      >
                        <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-sm flex items-center justify-center border-2 border-primary-red">
                          <IoCheckmark className="text-primary-red text-sm" />
                        </div>
                      </div>
                    )}

                    {!isSelected && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-transparent rounded-sm border-white border-2 z-10" />
                    )}

                    <Image
                      src={imageUrl}
                      alt={title}
                      width={200}
                      height={200}
                      className="rounded"
                    />
                  </div>
                  <p>{title}</p>
                </div>
              );
            })}
          </div>
          {/* Pagination for alle værker VIRKER IKKE :( */}
          {totalPages > 1 && (
            // <div className="flex justify-center gap-2 my-4">
            //   {Array.from({ length: totalPages }, (_, i) => (
            //     <motion.button
            //       key={i}
            //       onClick={() => setCurrentPage(i + 1)}
            //       whileHover={{ scale: 1.05 }}
            //       whileTap={{ scale: 0.95 }}
            //       transition={{ duration: 0.1 }}
            //       className={`px-2 py-1 mb-5 border rounded ${
            //         currentPage === i + 1
            //           ? "bg-primary-red text-white border-primary-red"
            //           : "border-primary-red text-primary-red hover:bg-[var(--color-primary-red-hover2)] hover:border-[var(--color-primary-red-hover2)] hover:text-white"
            //       }`}
            //     >
            //       {i + 1}
            //     </motion.button>
            //   ))}
            // </div>
<div className="flex justify-center gap-3 mt-4">
  <button
    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Forrige
  </button>
  <span>
    Side {currentPage} af {totalPages}
  </span>
  <button
    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Næste
  </button>
</div>
          )}
        </div>
      </div>

      {/* Højre kolonne - Valgte værker */}
      <div className="w-full sm:w-[300px]">
        <h5 className="mb-2">Valgte værker ({selectedArtworks.length}):</h5>

        {selectedArtworks.length === 0 ? (
          <p>Ingen værker valgt endnu.</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2">
              {displayedSelectedArtworks.map((id) => {
                const artwork = artworks.find((a) => a.id === id);
                if (!artwork) return null;
                const imageUrl = artwork.image_thumbnail || "/dummy4.jpg";
                const title = artwork.titles?.[0]?.title || "Uden titel";

                return (
                  <div key={id} className="text-sm">
                    <Image
                      src={imageUrl}
                      alt={title}
                      width={100}
                      height={100}
                      className="rounded"
                    />
                    <p className="truncate">{title}</p>
                  </div>
                );
              })}
            </div>

            {/* Pagination for valgte værker VIRKER*/}
            {selectedTotalPages > 1 && (
              <div className="flex justify-center gap-2 my-4">
                {Array.from({ length: selectedTotalPages }, (_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedArtworksPage(i + 1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className={`px-2 py-1 mb-2 border rounded ${
                      selectedArtworksPage === i + 1
                        ? "bg-primary-red text-white border-primary-red"
                        : "border-primary-red text-primary-red hover:bg-[var(--color-primary-red-hover2)] hover:border-[var(--color-primary-red-hover2)] hover:text-white"
                    }`}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </div>
            )}

            <div className="flex justify-between mt-4">
              {selectedArtworks.length > 0 && (
                <Button
                  onClick={() => {
                    setSelectedArtworks([]);
                    setSelectedArtworksPage(1);
                  }}
                  variant="transparent_w_icon"
                >
                  <LuTrash2 />
                  Ryd valg
                </Button>
              )}
              <Button variant="CTA">Læg til værker</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArtworkList;
