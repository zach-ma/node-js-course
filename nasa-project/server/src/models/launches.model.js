const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X", // required
  rocket: "Explorer IS1", // required
  launchDate: new Date("December 27, 2030"), // required
  target: "Kepler-442 b", // required
  customers: ["NASA", "SPACE X"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["NASA", "SPACE X"],
      upcoming: true,
      success: true,
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
};
