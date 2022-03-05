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

export {
  destinations,
  trips,
  travelers
}
