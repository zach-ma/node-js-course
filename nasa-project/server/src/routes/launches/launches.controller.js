const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
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

  addNewLaunch(launch);

  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  if (existsLaunchWithId(launchId)) {
    // if launch does exist
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
  } else {
    // if launch doesn't exist
    return res.status(400).json({
      error: "Launch not found",
    });
  }
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
