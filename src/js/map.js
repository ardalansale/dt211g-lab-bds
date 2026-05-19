/**
 * Hämtar koordinater för en plats via Nominatim API.
 * @async
 * @param {string} query - Platsen användaren söker.
 * @returns {Promise<{lat: number, lon: number}>} Objekt med latitude och longitude.
 */
async function fetchCoordinates(query) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`);
    const data = await response.json();

    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
    };
}

/**
 * Uppdaterar OpenStreetMap‑iframe med en markör på angiven position.
 * @param {string} elementId - ID för iframe‑elementet.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 */
function updateMap(elementId, lat, lon) {
    const iframe = document.getElementById(elementId);
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}&marker=${lat},${lon}`;
}

/**
 * Hämtar användarens sökinput, hämtar koordinater och uppdaterar kartan.
 * @async
 * @returns {Promise<void>}
 */
async function searchLocation() {
    const input = document.getElementById("search-input").value;

    if (!input.trim()) return;

    const { lat, lon } = await fetchCoordinates(input);
    updateMap("map", lat, lon);
}

document.getElementById("search-btn").addEventListener("click", searchLocation);
