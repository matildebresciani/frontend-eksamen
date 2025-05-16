//maja
//fetch til at hente kunstværker fra SMK
async function fetchArtworkById(artworkId) {
  try {
    const response = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${artworkId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch artwork with ID ${artworkId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching artwork with ID ${artworkId}:`, error);
    throw error;
  }
}
export { fetchArtworkById };
