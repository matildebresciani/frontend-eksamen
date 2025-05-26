//Katinka

//Lavet dynamisk med hjælp fra ChatGPT
const SingleArtTextContent = ({ data }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 gap-3 sm:gap-5 md:gap-8">
      {/*Dette henter data. Skal fjernes senere*/}
      {/* <details>
        <summary>Debug data</summary>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </details> */}

      <div className="pt-6 sm:pt-8 md:pt-12 sm:col-[1/2] sm:self-start sm:sticky sm:top-20">
        <h4 className="italic">{data.titles?.[0]?.title || "Ukendt titel"}</h4>
        <h4>{data.production?.[0].creator || "Ukendt kunstner"}</h4>
        <p>
          Kunstnerens nationalitet:{" "}
          {data.production?.[0]?.creator_nationality || "Ukendt nationalitet"}
        </p>
        <p>Periode: {data.production_date?.[0].period || "Ukendt periode"}</p>
        <p>
          Ansvarlig afdeling: {data.responsible_department || "Ukendt afdeling"}
        </p>
        <p>Teknik: {data.techniques?.join(", ") || "Ukendt teknik"}</p>
        <p>Materialer: {data.materials?.join(", ") || "Ukendt materiale"}</p>
        <p>Farver brugt:</p>
        <div className="flex gap-3 flex-wrap py-3">
          {data.colors && data.colors.length > 0 ? (
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
                title={color} // Tooltip med farvekoden/navnet
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
                <strong>{exh.exhibition}</strong> — {exh.venue},{" "}
                {new Date(exh.date_start).toLocaleDateString()} til{" "}
                {new Date(exh.date_end).toLocaleDateString()}
              </li>
            ))
          ) : (
            <li>Ukendt</li>
          )}
        </ul>
        <h5 className="mt-6 md:mt-8">Se kunstværket på følgende events:</h5>
        <p className="mt-2 md:mt-4">Hente events fra eventlist HER</p>
      </div>
    </div>
  );
};

export default SingleArtTextContent;
