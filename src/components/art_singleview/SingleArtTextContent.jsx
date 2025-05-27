//Katinka

//Lavet dynamisk med hjælp fra ChatGPT

import Link from "next/link";

const SingleArtTextContent = ({ data, allEvents = [] }) => {
  // Filtrér events der indeholder dette værk
  const relatedEvents = allEvents.filter((event) =>
    event.artworkIds?.includes(data.object_number)
  );

  function formatDanishDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("da-DK", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="sm:grid sm:grid-cols-3 gap-3 sm:gap-5 md:gap-8">
      <div className="pt-6 sm:pt-8 md:pt-12 sm:col-[1/2] sm:self-start sm:sticky sm:top-0">
        <h3 className="italic mb-4">
          {data.titles?.[0]?.title || "Ukendt titel"}
        </h3>
        {/* <h4>{data.production?.[0].creator || "Ukendt kunstner"}</h4> */}
        <h4>{data.artist || "Ukendt kunstner"}</h4>
        <ul>
          <li>
            <span className="font-semibold">Kunstnerens nationalitet:</span>{" "}
            {data.production?.[0]?.creator_nationality || "Ukendt nationalitet"}
          </li>
          <li>
            <span className="font-semibold">Periode:</span>{" "}
            {data.production_date?.[0].period || "Ukendt periode"}
          </li>
          <li>
            <span className="font-semibold">Ansvarlig afdeling:</span>{" "}
            {data.responsible_department || "Ukendt afdeling"}
          </li>
          <li>
            <span className="font-semibold">Teknik:</span>{" "}
            {data.techniques?.join(", ") || "Ukendt teknik"}
          </li>
          <li>
            <span className="font-semibold">Materialer:</span>{" "}
            {data.materials?.join(", ") || "Ukendt materiale"}
          </li>
          <li>
            <span className="font-semibold">Farver brugt:</span>
          </li>
        </ul>
        <div className="flex gap-3 flex-wrap py-3">
          {data.colors?.length > 0 ? (
            data.colors.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: color,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid var(--color-text-light)",
                }}
                title={color}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Ingen farver fundet i databasen.
            </p>
          )}
        </div>
      </div>

      <div className="pt-5 sm:pt-8 md:pt-12 sm:col-[2/4]">
        <h5>Kunstnerens historie:</h5>
        <p className="mt-2 md:mt-4">
          {data.production?.[0]?.creator_history || "Ukendt historie"}
        </p>

        <h5 className="mt-6 md:mt-8">Tidligere udstillinger:</h5>
        <ul className="mt-2 md:mt-4">
          {data.exhibitions?.length > 0 ? (
            data.exhibitions.map((exh, i) => (
              <li key={i}>
                <span className="font-semibold">{exh.exhibition}</span> —{" "}
                {new Date(exh.date_start).toLocaleDateString("da-DK", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                til{" "}
                {new Date(exh.date_end).toLocaleDateString("da-DK", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                — {exh.venue}
              </li>
            ))
          ) : (
            <li>Ukendt</li>
          )}
        </ul>

        <h5 className="mt-6 md:mt-8">Se kunstværket på følgende events:</h5>
        <ul className="mt-2 md:mt-4 list-none list-inside ">
          {relatedEvents.length > 0 ? (
            relatedEvents.map((event) => (
              <li key={event.id}>
                <Link
                  href={`/events/${event.id}`}
                  className="first-letter:capitalize text-primary-red font-semibold inline-block transition-transform transform hover:scale-103 hover:text-primary-red-hover2"
                >
                  {event.title}
                </Link>
                <span>
                  {" "}
                  —{" "}
                  {new Date(event.date).toLocaleDateString("da-DK", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  —{" "}
                  {event.location?.name && event.location?.address
                    ? `${event.location.name}, ${event.location.address}`
                    : "Lokation ikke tilgængelig"}
                </span>
              </li>
            ))
          ) : (
            <li>Ingen aktuelle events for dette værk</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SingleArtTextContent;
