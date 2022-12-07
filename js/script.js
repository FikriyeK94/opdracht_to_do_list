/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

// Hulp gekregen van Zino Hoffman


// Alle taken worden opgeslagen in objecten in een array.
var taken = [{
    naam: 'Taak 1',
    klaar: false
}, {
    naam: 'Taak 2',
    klaar: false
}, {
    naam: 'Taak 3',
    klaar: false
}];

// Input
var nieuweTaakNaam = document.querySelector('.nieuwe-taak-naam');

// Knop
var voegTaakToe = document.querySelector('.voeg-taak-toe');

// Verwijder alles knop
var verwijderAlles = document.querySelector('.verwijder-alles');

// Lijst
var takenLijst = document.querySelector('.taken-lijst');

function checkboxClick(event) {
    // Kijk welk item er bewerkt moet worden.
    'use strict';
    var taak = event.target.parentElement,
        i = taak.id;

    // Verander de waarde van de key 'klaar' naar de zijn tegenover gestelde waarde.
    taken[i].klaar = !taken[i].klaar;

    // Verander de stijl van de taak.
    if (taken[i].klaar) {
        taak.classList.add('klaar');
    } else {
        taak.classList.remove('klaar');
    }
}

function bewerkenClick(event) {
    // Kijk welk item er bewerkt moet worden.
    'use strict';
    var taak = event.target.parentElement,
        i = taak.id,

    // Selecteer de taak naam uit het taak element.
        naam = taak.querySelector('.taak-naam');

    naam.disabled = !naam.disabled;

    if (!naam.disabled) {
        event.target.src = './images/klaar.svg';
        naam.focus();
        taken[i].naam = naam.value;
    } else {
        event.target.src = './images/bewerken.svg';
    }
}

function verwijderenClick(event) {
    // Kijk welk item er bewerkt moet worden.
    'use strict';
    var taak = event.target.parentElement,
        i = taak.id;

    // Voeg de verwijderd class to aan het tak element voor de animatie.
    taak.classList.add('verwijderd');

    // Verwijder de taak uit de array.
    taken.splice(i, 1);

    // Wacht totdat de animatie is afgelopen, herlaad dan de taken lijst
    setTimeout(takenWeergeven, 300);
}

// Geef alle taken weer in de DOM.
function takenWeergeven() {
    'use strict';
    var i, listItem, checkbox, naam, bewerken, verwijderen;

    // Maak het lijstje van taken leeg.
    takenLijst.innerHTML = '';

    // Voor elke taak in de taken array, render de taak.
    for (i = 0; i < taken.length; i++) {
        // Maar een nieuwe list item;
        listItem = document.createElement('li');
        listItem.classList.add('taak');
        listItem.id = i;

        checkbox = document.createElement('input');
        checkbox.classList.add('taak-checkbox');
        checkbox.type = 'checkbox';
        checkbox.checked = taken[i].klaar;
        checkbox.addEventListener('click', checkboxClick);

        naam = document.createElement('input');
        naam.disabled = true;
        naam.value = taken[i].naam;
        naam.classList.add('taak-naam');

        bewerken = document.createElement('img');
        bewerken.src = './images/bewerken.svg';
        bewerken.classList.add('taak-bewerken');
        bewerken.addEventListener('click', bewerkenClick);

        verwijderen = document.createElement('img');
        verwijderen.src = './images/verwijderen.svg';
        verwijderen.classList.add('taak-verwijderen');
        verwijderen.addEventListener('click', verwijderenClick);

        listItem.appendChild(checkbox);
        listItem.appendChild(naam);
        listItem.appendChild(bewerken);
        listItem.appendChild(verwijderen);

        takenLijst.appendChild(listItem);
    }
}

// Functie voor wanneer er op voeg toe geklikt wordt.
function voegTaakToeClick() {
    'use strict';
    if (nieuweTaakNaam.value) {
    // Voeg de nieuwe taa ktoe aan de array.
        taken.push({
            naam: nieuweTaakNaam.value,
            klaar: false
        });

    // Maak het input vled weer leeg.
        nieuweTaakNaam.value = '';
        takenWeergeven();

    } else {
        alert("U heeft geen taak ingevuld");
    }
}

// Functie voor wanneer er op voeg toe geklikt wordt.
function verwijderAllesClick() {
    'use strict';
    // Maak de taken array leeg.
    taken = [];

    // Geef de legen taken array weer.
    takenWeergeven();
}

takenWeergeven();

voegTaakToe.addEventListener('click', voegTaakToeClick);
document.addEventListener('keyup', function (event) {
    'use strict';
    if (event.code === 'Enter') {
        voegTaakToeClick();
    }
});

verwijderAlles.addEventListener('click', verwijderAllesClick);
