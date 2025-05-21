//Katinka
// Jeg ønsker følgende forbedringer:
// 1. Man skal kunne klikke udenfor dropdown og dropdown lukker
// 2. Når man vælger et værk i dropdown skal dropdown lukke
// 3. Når man søger på f.eks. olie og trykker på enter, er der 4 sider med værker. Man skal kunne bladre igennem dem!

import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

const SearchBar = ({ artworks, onLiveSearch, onSelectSuggestion }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();

    if (!lowerQuery.trim()) {
      setSuggestions([]);
      onLiveSearch(null);
      return;
    }

    const filtered = artworks.filter((item) => {
      const title = item.titles?.[0]?.title?.toLowerCase() || "";
      const creator = item.production?.[0]?.creator?.toLowerCase() || "";
      const techniques = (item.techniques || []).join(" ").toLowerCase();
      const materials = (item.materials || []).join(" ").toLowerCase();

      return (
        title.includes(lowerQuery) ||
        creator.includes(lowerQuery) ||
        techniques.includes(lowerQuery) ||
        materials.includes(lowerQuery)
      );
    });

    setSuggestions(filtered);
    setHighlightedIndex(-1);
    onLiveSearch(filtered);
  }, [query, artworks, onLiveSearch]);

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setHighlightedIndex(-1);
    onLiveSearch(null);
  };

  const handleSuggestionClick = (item) => {
    setQuery(item.titles?.[0]?.title || "");
    // setSuggestions([]);
    // setHighlightedIndex(-1);
    // onSelectSuggestion([item]);
    onSelectSuggestion([item]);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Giver søgeord font-weight
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const index = text.toLowerCase().indexOf(query.toLowerCase());

    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <strong className="font-semibold">
          {text.substring(index, index + query.length)}
        </strong>
        {text.substring(index + query.length)}
      </>
    );
  };

  return (
    <div ref={wrapperRef} className="relative mt-8 sm:mt-3 pb-3 w-full">
      <input
        type="text"
        placeholder="Søg efter titel, kunstner, teknik eller materiale"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) =>
              prev < suggestions.length - 1 ? prev + 1 : 0
            );
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
              prev > 0 ? prev - 1 : suggestions.length - 1
            );
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) {
              handleSuggestionClick(suggestions[activeIndex]);
            } else {
              // Luk dropdown, men behold søgning
              setSuggestions([]);
              onLiveSearch(
                artworks.filter((item) => {
                  const lowerQuery = query.toLowerCase();
                  const title = item.titles?.[0]?.title?.toLowerCase() || "";
                  const creator =
                    item.production?.[0]?.creator?.toLowerCase() || "";
                  const techniques = (item.techniques || [])
                    .join(" ")
                    .toLowerCase();
                  const materials = (item.materials || [])
                    .join(" ")
                    .toLowerCase();

                  return (
                    title.includes(lowerQuery) ||
                    creator.includes(lowerQuery) ||
                    techniques.includes(lowerQuery) ||
                    materials.includes(lowerQuery)
                  );
                })
              );
            }
          } else if (e.key === "Escape") {
            setSuggestions([]);
          }
        }}
        className="w-full pr-10 pl-3 py-2 bg-white border text-[var(--color-text-light)] border-gray-300 rounded-xs shadow-md focus:outline-none focus:border-secondary-cherry-light focus:ring-1 focus:ring-secondary-cherry-light"
      />

      <div
        className="absolute top-3 right-3 flex items-center text-[var(--color-text-light)] cursor-pointer"
        onClick={query ? clearSearch : null}
      >
        {query ? (
          <GoPlus className="w-5 h-5 rotate-45" />
        ) : (
          <CiSearch className="w-5 h-5" />
        )}
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-20 bg-white border border-gray-300 w-full mt-1 rounded shadow-md max-h-60 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li
              key={item.id}
              className={`p-2 cursor-pointer ${
                index === activeIndex ? "bg-gray-100" : "hover:bg-gray-100"
              }`}
              onClick={() => handleSuggestionClick(item)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="font-medium">
                {highlightMatch(item.titles?.[0]?.title || "Uden titel", query)}
              </span>
              <span className="text-sm text-gray-500 block">
                {highlightMatch(
                  item.production?.[0]?.creator || "Ukendt kunstner",
                  query
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
