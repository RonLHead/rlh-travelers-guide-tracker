//GET requests
const destinations = fetch("http://localhost:3001/api/v1/destinations").then((responses) =>
  responses.json()
);

const trips = fetch(
  "http://localhost:3001/api/v1/trips"
).then((responses) => responses.json());

const travelers = fetch("http://localhost:3001/api/v1/travelers").then((responses) =>
  responses.json()
);

//POST requests
const addTrip = (newTrip) => {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTrip),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Please make sure all fields are filled out");
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.message === "Failed to fetch") {
        return (errorTag.innerText = "OOPS SORRY something went wrong");
      } else {
        return (errorTag.innerText = error.message);
      }
    });
};

export {
  destinations,
  trips,
  travelers,
  addTrip
}
