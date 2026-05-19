/**
 * Hämtar antagningsstatistik från HT25.
 * Filtrerar ut kurser och program, sorterar dem och returnerar de mest sökta.
 * @async
 * @returns {Promise<{courses: Object[], programs: Object[]}>}
 */
async function fetchAdmissionData() {
    const response = await fetch("https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json");
    const data = await response.json();

    const courses = data
        .filter(item => item.type === "Kurs")
        .sort((a, b) => parseInt(b.applicantsTotal) - parseInt(a.applicantsTotal))
        .slice(0, 6);

    const programs = data
        .filter(item => item.type === "Program")
        .sort((a, b) => parseInt(b.applicantsTotal) - parseInt(a.applicantsTotal))
        .slice(0, 5);

    return { courses, programs };
}

/**
 * Skapar ett stapeldiagram med de mest sökta kurserna.
 * @param {string} elementId - ID för canvas-elementet.
 * @param {string[]} labels - Kursnamn.
 * @param {number[]} values - Antal sökande.
 */
function createBarChart(elementId, labels, values) {
    new Chart(document.getElementById(elementId), {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Totalt antal sökande",
                data: values
            }]
        }
    });
}

/**
 * Skapar ett cirkeldiagram med de mest sökta programmen.
 * @param {string} elementId - ID för canvas-elementet.
 * @param {string[]} labels - Programnamn.
 * @param {number[]} values - Antal sökande.
 */
function createPieChart(elementId, labels, values) {
    new Chart(document.getElementById(elementId), {
        type: "pie",
        data: {
            labels,
            datasets: [{
                data: values
            }]
        }
    });
}

/**
 * Laddar data och genererar båda diagrammen.
 * @async
 * @returns {Promise<void>}
 */
async function loadCharts() {
    const { courses, programs } = await fetchAdmissionData();

    createBarChart(
        "bar-chart",
        courses.map(c => c.name),
        courses.map(c => parseInt(c.applicantsTotal))
    );

    createPieChart(
        "pie-chart",
        programs.map(p => p.name),
        programs.map(p => parseInt(p.applicantsTotal))
    );
}

document.addEventListener("DOMContentLoaded", loadCharts);
