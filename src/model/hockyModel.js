const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const HockySchema = new mongoose.Schema(
  {
    UserId: {
      type: ObjectId,
      ref: "User",
      unique: true,
    },
    hocMatch: {
      type: Number,
      trim: true,
    },
    hocRuns: {
      type: Number,
      trim: true,
    },
    hocWins: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("hocky", HockySchema);
