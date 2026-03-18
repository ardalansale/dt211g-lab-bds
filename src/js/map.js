/* Funktion för att hämta och visa kartdata för kartan*/

/* JSDoc-kommentarer */
/**
* @file maps.js
* @description Söker efter en plats med Nominatim API och visar den på en OpenStreetMap-iframe.
*/

async function searchLocation() {
    /* .value hämtar det som skrivs i textfältet. Det sparas i 'input' så det går att använda sen i fetch-anropet. */
    const input = document.getElementById("search-input").value;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${input}&format=json`);
    const data = await response.json();

    const lat = data[0].lat;
    const lon = data[0].lon;
    const iframe = document.getElementById("map");
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}&marker=${lat},${lon}`;
}

document.getElementById("search-btn").addEventListener("click", searchLocation);