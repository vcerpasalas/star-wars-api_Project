const apiUrl = "https://swapi.dev/api";

// Get data from the API
async function getData(endpoint) {
  const response = await fetch(`${apiUrl}/${endpoint}`);
  const data = await response.json();
  return data;
}

// Get image from API
async function getImage(endpoint) {
  const response = await fetch(endpoint);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

// Display people data
async function displayPeople() {
  const peopleList = document.getElementById("people-list");
  const peopleData = await getData("people");
  peopleData.results.forEach(async (person) => {
    
    // Create card element
    const card = document.createElement("div");
    card.classList.add("card");

    // Add person image to card
    const image = document.createElement("img");
    const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${getCharId(person.url)}.jpg`;
    image.src = await getImage(imageUrl);
    image.alt = person.name;
    card.appendChild(image);

    // Add person name to card
    const name = document.createElement("h3");
    name.textContent = person.name;
    card.appendChild(name);

    // Add person info to card
    const info = document.createElement("ul");
    info.classList.add("card-info");
    const height = document.createElement("li");
    height.textContent = `Height: ${person.height}`;
    info.appendChild(height);
    const mass = document.createElement("li");
    mass.textContent = `Mass: ${person.mass}`;
    info.appendChild(mass);
    const birthYear = document.createElement("li");
    birthYear.textContent = `Birth year: ${person.birth_year}`;
    info.appendChild(birthYear);
    card.appendChild(info);

    // Add card to list
    peopleList.appendChild(card);
  });
}

// Display films data
async function displayFilms() {
  const filmsList = document.getElementById("films-list");
  const filmsData = await getData("films");
  filmsData.results.forEach((film) => {
    const listItem = document.createElement("li");
    listItem.textContent = film.title;
    filmsList.appendChild(listItem);
  });
}

// Utility function to get character ID from URL
function getCharId(url) {
  const id = url.match(/\/([0-9]*)\/$/)[1];
  return id;
}

displayPeople();
displayFilms();
