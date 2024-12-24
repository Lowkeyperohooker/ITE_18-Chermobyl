import { startExploration } from './exploration.js';
import { startReactor } from './reactor4.js';

// Pages
const landingPage = document.querySelector('.landing-page');
const explorePage = document.querySelector('.explore-page');
const reactorPage = document.querySelector('.reactor-page');
const militaryBasePage = document.querySelector('.military-base-page') || null;
const apartmentBuildingPage = document.querySelector('.apartment-building-page') || null;
const ferrisWheelPage = document.querySelector('.ferris-wheel-page') || null;
const workerQuarterPage = document.querySelector('.worker-quarter-page') || null;

const canvas = document.querySelector('.webgl');
const exploreButton = document.getElementById('explore-button');
const reactor4Button = document.getElementById('reactor4-button');
const militaryBaseButton = document.getElementById('military-base-button');
const apartmentBuildingButton = document.getElementById('apartment-building-button');
const ferrisWheelButton = document.getElementById('ferris-wheel-button');
const workerQuarterButton = document.getElementById('worker-quarter-button');
const watchThisButton = document.getElementById('watch-this-button');

/**
 * Helper Function: Navigate between pages
 */
function navigateToPage(hidePage, showPage, callback) {
    if (hidePage) hidePage.style.display = 'none';
    if (showPage) showPage.style.display = 'block';
    if (callback) callback();
}

/**
 * Centralized Event Handling     --- Needs to be modified ---- something about redundant calls
 */
document.addEventListener('click', (event) => {
    const target = event.target;

    // Landing Page to Exploration Page
    if (target === exploreButton) {
        navigateToPage(landingPage, explorePage, () => startExploration(canvas));
    }

    // Exploration Page to Other Pages
    if (target === reactor4Button) {
        navigateToPage(explorePage, reactorPage, () => startReactor(canvas));
    }
    if (target === militaryBaseButton) {
        navigateToPage(explorePage, militaryBasePage, () => console.log('Military Base Page loaded.'));
    }
    if (target === apartmentBuildingButton) {
        navigateToPage(explorePage, apartmentBuildingPage, () => console.log('Apartment Building Page loaded.'));
    }
    if (target === ferrisWheelButton) {
        navigateToPage(explorePage, ferrisWheelPage, () => console.log('Ferris Wheel Page loaded.'));
    }

    // Reactor Page to Other Pages
    if (target === exploreButton) {
        navigateToPage(reactorPage, explorePage, () => startExploration(canvas));
    }
    if (target === apartmentBuildingButton) {
        navigateToPage(reactorPage, apartmentBuildingPage, () => console.log('Apartment Building Page loaded.'));
    }
    if (target === ferrisWheelButton) {
        navigateToPage(reactorPage, ferrisWheelPage, () => console.log('Ferris Wheel Page loaded.'));
    }

    // Apartment Building Page to Other Pages
    if (target === exploreButton) {
        navigateToPage(apartmentBuildingPage, explorePage, () => console.log('Explore Page loaded.'));
    }
    if (target === reactor4Button) {
        navigateToPage(apartmentBuildingPage, reactorPage, () => console.log('Reactor 4 Page loaded.'));
    }
    if (target === ferrisWheelButton) {
        navigateToPage(apartmentBuildingPage, ferrisWheelPage, () => console.log('Ferris Wheel Page loaded.'));
    }

    // Ferris Wheel Page to Other Pages
    if (target === exploreButton) {
        navigateToPage(ferrisWheelPage, explorePage, () => console.log('Explore Page loaded.'));
    }
    if (target === reactor4Button) {
        navigateToPage(ferrisWheelPage, reactorPage, () => console.log('Reactor 4 Page loaded.'));
    }
    if (target === apartmentBuildingButton) {
        navigateToPage(ferrisWheelPage, apartmentBuildingPage, () => console.log('Apartment Building Page loaded.'));
    }

    // Watch This Button: Open YouTube Video
    if (target === watchThisButton) {
        window.open('https://www.youtube.com/watch?v=MGw3kRGX35s&t=658s', '_blank');
    }
});
