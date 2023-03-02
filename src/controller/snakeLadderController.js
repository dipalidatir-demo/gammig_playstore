const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const snakeLadderModel = require("../model/snakeLadderModel");

const createSnak = async function (req, res) {
  try {
    // let snakMatch = req.query.hasOwnProperty("snakMatch") ? req.query.cricMatch : ""
    // let snakRuns = req.query.hasOwnProperty("snakRuns") ? req.query.cricRuns : ""
    // let snakWins = req.query.hasOwnProperty("snakWins") ? req.query.cricWins : ""

    let body = req.body;
    let UserIdForSnakeL = UserId._id;
    let UserId = await userModel.findById({ UserId: UserIdForSnakeL });

    if (Object.keys(body).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should be not Empty please enter some data to create snakeLadderUser",
      });
    }

    const createSnakeTable = await snakeLadderModel.create(body);

    return res.status(201).send({
      status: true,
      message: " snakeLadder table created successfully",
      data: createSnakeTable,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//__________get snakeLadder Data

const getSnak = async function (req, res) {
  try {
    let UserId1 = req.query.UserId1;

    let snakeLadder = await snakeLadderModel.findOne({ UserId: UserId1 }); // find by useerId not A new created mongodb id

    if (!snakeLadder) {
      return res
        .status(404)
        .send({ status: false, message: "this UserId not found" });
    }

    return res.status(200).send({
      status: true,
      message: "success",
      data: snakeLadder,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

//___________update table

const updateSnak = async function (req, res) {
  try {
    let updateData = req.body;
    let UserId = req.query.UserId;

    const matchData = await snakeLadderModel.findOneAndUpdate(
      { UserId: UserId },
      updateData,
      { new: true }
    );

    if (matchData.length == 0) {
      return res.status(404).send({
        status: false,
        message: "user not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: matchData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

//____________get All data of SnakeLadder

const getAllSnak = async function (req, res) {
  try {
    let data = req.query;

    const snakeLadderData = await snakeLadderModel
      .find(data)
      .sort({ snakMatch: -1, snakRuns: -1, snakWins: -1 });

      if (data.length == 0) {
        return res
          .status(404)
          .send({ status: false, message: " no data is  found " });
      }

      return res.status(200).send({
        status: true,
        message: "Success",
        data: snakeLadderData,
      });

  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

module.exports = { createSnak, getSnak, updateSnak, getAllSnak };
