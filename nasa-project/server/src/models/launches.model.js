const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

// const launches = new Map(); // state in memory
// let latestFlightNumber = 100; // state in memory

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

// launches.set(launch.flightNumber, launch);
// saveLaunch(launch);

async function existsLaunchWithId(launchId) {
  // return launches.has(launchId);
  return await launchesDatabase.findOne({ flightNumber: launchId });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  //   return Array.from(launches.values());
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await planets.findOne({ keplerName: launch.target });

  try {
    if (!planet) {
      throw new Error("No matching planet found");
    }

    await launchesDatabase.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        // insert + update = upsert
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save launch ${err}`);
  }
}

// function addNewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNumber,
//       customers: ["NASA", "SPACE X"],
//       upcoming: true,
//       success: true,
//     })
//   );
// }

// increment latestFlightNumber by 1, assign default properties
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["NASA", "SPACE X"],
    upcoming: true,
    success: true,
  });
  await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
  //   const aborted =  launches.get(launchId);
  //   aborted.upcoming = false;
  //   aborted.success = false;
  //   return aborted;
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  console.log(aborted);
  return aborted.modifiedCount === 1;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  //   addNewLaunch,
  scheduleNewLaunch,
  abortLaunchById,
};
