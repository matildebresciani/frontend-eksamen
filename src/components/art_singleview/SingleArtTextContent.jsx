//Katinka

//Lavet dynamisk med hjælp fra ChatGPT
const SingleArtTextContent = ({ data }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 gap-3 sm:gap-5 md:gap-8">
      <div className="pt-6 sm:pt-8 md:pt-12 sm:col-[1/2] sm:self-start sm:sticky sm:top-20">
        <h3>{data.titles?.title || "Ukendt titel"}</h3>
        <h4>{data.creator || "Ukendt kunstner"}</h4>
        <h5>Periode:</h5>
        <p>{data.production_date?.period || "Ukendt periode"}</p>
        <p>{data.production_dates_notes?.join(", ")}</p>
        <h5>Ansvarlig afdeling:</h5>
        <p>{data.responsible_department || "Ukendt afdeling"}</p>
        <h5>Teknik:</h5>
        <p>{data.techniques?.join(", ") || "Ukendt teknik"}</p>
        <h5>Materialer:</h5>
        <p>{data.materials?.join(", ") || "Ukendt materiale"}</p>
        <h5>Type:</h5>
        <p>{data.object_names?.name || "Ukendt type"}</p>
        <h5>Farver brugt:</h5>
        {/* <div>{data.colors?.join(", ")}</div> */}
        <div className="flex gap-3 flex-wrap py-3">
          {data.colors?.map((color, index) => (
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
          ))}
        </div>
      </div>
      <div className="pt-5 sm:pt-8 md:pt-12 sm:col-[2/4]">
        <h5>Kunstners nationalitet:</h5>
        <p>{data.creator_nationality || "Ukendt nationalitet"}</p>
        <h5>Kunstners køn:</h5>
        <p>{data.creator_gender || "Ukendt køn"}</p>
        <h5>Kunstners fødselsdato:</h5>
        <p>{data.creator_date_of_birth || "Ukendt fødselsdato"}</p>
        <h5>Kunstners dødsdato:</h5>
        <p>{data.creator_date_of_death || "Ukendt"}</p>
        <h5>Kunstners historie:</h5>
        <p>{data.creator_history || "Ukendt historie"}</p>
        <h5>Udstillinger:</h5>
        <p>{data.exhibitions?.join(", ") || "Ukendt"}</p>
      </div>
    </div>
  );
};

export default SingleArtTextContent;
