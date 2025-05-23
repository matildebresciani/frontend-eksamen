"use client";
import Image from "next/image";
import { IoCheckmark } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import Button from "../Button";
import FilterBtn from "./FilterBtn";
import SearchBar from "./SearchBar";
import { motion } from "motion/react";
import { useArtworksLogic } from "@/utils/artworksLogic";

const ArtworkList = ({blurred = false, selectedArtworks, setSelectedArtworks, selectedDate }) => {
  const {
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
  } = useArtworksLogic(selectedDate, selectedArtworks, setSelectedArtworks);


  return (
    <div className={`flex flex-col sm:flex-row gap-8 ${blurred ? "filter blur-sm pointer-events-none select-none" : ""}`}>
      {/* Venstre kolonne - Kunstværker */}
      <div className="flex-1 max-w-[600px]">
        <h5>Vælg op til {MAX_SELECTION} værker:</h5>
        <p>Du kan vælge {MAX_SELECTION - selectedArtworks.length} værker mere</p>

        <SearchBar onLiveSearch={handleSearchResult} onSelectSuggestion={handleSearchResult} />

        <FilterBtn
          selectedArtists={selectedArtists}
          selectedTechniques={selectedTechniques}
          selectedMaterials={selectedMaterials}
          onSelectArtist={handleSelectArtist}
          onSelectTechnique={handleSelectTechnique}
          onSelectMaterial={handleSelectMaterial}
        />

        <Button onClick={handleClearFilters} className="btn btn-primary mt-5">
          Nulstil filtre
        </Button>

        <motion.div layout className="grid grid-cols-3 gap-3 mt-3 max-h-[500px] overflow-y-auto">
          {displayedArtworks.length === 0 && <p>Ingen billeder fundet</p>}

          {displayedArtworks.map((artwork) => {
            const isSelected = selectedArtworks.includes(artwork.id);
            const isBooked = isArtworkBooked(artwork.id);
            const imageUrl = artwork.image_thumbnail || "/placeholder.jpg";
            const title = artwork.titles?.[0]?.title || "Uden titel";


            return (
              <motion.div
                key={artwork.id}
                onClick={() => toggleSelect(artwork.id)}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 ${
                  isSelected ? "border-secondary" : "border-transparent"
                } ${isBooked ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 600px) 33vw, 200px"
                  className="object-cover"
                />
                {isSelected && (
                  <IoCheckmark className="absolute right-1 top-1 text-xl text-secondary" />
                )}
                {isBooked && (
                  <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center text-white font-bold text-center text-sm">
                    Booket
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <div className="flex justify-center mt-3 gap-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Højre kolonne - Valgte værker */}
      <div className="flex-1 max-w-[350px] sm:max-w-[400px]">
        <h5>
          Valgte værker ({selectedArtworks.length} / {MAX_SELECTION})
        </h5>

        {selectedArtworks.length === 0 && <p>Ingen valgte værker endnu</p>}

        <motion.div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto mt-3">
          {displayedSelectedArtworks.map((id) => {
            const artwork = displayedArtworks.find((a) => a.id === id);
            const imageUrl = artwork.image_thumbnail || "/placeholder.jpg";
            const title = artwork.titles?.[0]?.title || "Uden titel";

            if (!artwork) return null;

            return (
              <div
                key={id}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-secondary"
                onClick={() => toggleSelect(id)}
              >
           <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 600px) 33vw, 200px"
            className="object-cover"
            />
                <LuTrash2 className="absolute right-1 top-1 text-lg text-secondary" />
              </div>
            );
          })}
        </motion.div>

        {selectedTotalPages > 1 && (
          <div className="flex justify-center mt-3 gap-3">
            {Array.from({ length: selectedTotalPages }).map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${
                  selectedArtworksPage === i + 1 ? "btn-primary" : "btn-ghost"
                }`}
                onClick={() => setSelectedArtworksPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkList;
