const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  // match with frontend
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planet", planetsSchema);
