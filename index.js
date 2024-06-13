const COHORT = "2404-FTB-MT-WEB_PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    events: [],
};

const eventList = document.querySelector("#events");
const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

async function render() {
    await getEvents();
    renderEvents();
}
render();

async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (result.success) {
          state.artists = result.data;
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    }

function renderEvents() {
    eventList.innerHTML = '';
    state.events.forEach(event => {
        const eventItem = document.createElement("li");
        eventItem.textContent = `${event.name} - ${event.time} - ${event.date} - ${event.location} - ${event.description}`;
        eventList.append(eventItem);
    });
}

async function addEvent(event) {
    event.preventDefault();

    const formData = new FormData(addEventForm);
    const newEvent = {
        name: formData.get("name"),
        date: formData.get("date"),
        time: formData.get("time"),
        location: formData.get("location"),
        description: formData.get("description"),
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEvent)
        });

        const result = await response.json();
        if (result.sucess) {
            state.events.push(result.data);
            renderEvents();
            addEventForm.reset();
        } else {
            console.error(result.error);
        }
    } catch (error) {
        console.error("failed to add event:", error);
    }
}