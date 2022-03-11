const {
  getAllLaunches,
  //   addNewLaunch,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  ////// validation
  // missing data
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  // invalid date
  launch.launchDate = new Date(launch.launchDate);
  // if (launch.launchDate.toString() === "Invalid Date") {
  // is Not a Number function
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  //   addNewLaunch(launch);
  await scheduleNewLaunch(launch);
  console.log(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;
  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    // if launch doesn't exist
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  // if launch does exist
  const aborted = await abortLaunchById(launchId);
  console.log(aborted);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
