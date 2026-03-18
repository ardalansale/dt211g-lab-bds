/* Funktion för att hämta data för stapeldiagram(bar-chart) och cirkeldiagram(pie-chart) */

import Chart from "chart.js/auto"; /*  Registrerar alla diagramtyper automatiskt så man slipper konfigurera något extra */

/* JSDoc-kommentarer */
/**
*  Hämtar antagningsstatistik från HT25 och skapar ett stapeldiagram och ett cirkeldiagram.
*  @async
*  @returns {Promise<void>}
*/

async function loadCharts() {

    const response = await fetch("https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json");
    const data = await response.json();
    const courses = data.filter(item => item.type === "Kurs");
    const program = data.filter(item => item.type === "Program");

    courses.sort((a, b) => parseInt(b.applicantsTotal) - parseInt(a.applicantsTotal));
    program.sort((a, b) => parseInt(b.applicantsTotal) - parseInt(a.applicantsTotal));

    const topCourses = courses.slice(0, 6);
    const topProgram = program.slice(0, 5);

    const courseNames = topCourses.map(item => item.name);
    const courseApplicants = topCourses.map(item => parseInt(item.applicantsTotal));

    const programNames = topProgram.map(item => item.name);
    const programApplicants = topProgram.map(item => parseInt(item.applicantsTotal));

    /* Skicka data till stapeldiagrammet */
    new Chart(document.getElementById("bar-chart"), {
    type: "bar",
    data: {
        labels: courseNames,
        datasets: [{
        label: "Totalt antal sökande",
        data: courseApplicants
        }]
    }});

    /* Skicka data till cirkeldiagrammet */
    new Chart(document.getElementById("pie-chart"), {
    type: "pie",
    data: {
        labels: programNames,
        datasets: [{
        data: programApplicants
        }]
    }});
}

document.addEventListener("DOMContentLoaded", loadCharts);