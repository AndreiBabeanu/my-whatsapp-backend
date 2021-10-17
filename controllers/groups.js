import Group from "../models/group.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

export const getGroups = async (req, res) => {
  console.log("requestul pe get");
  try {
    const groups = await Group.find();
    // console.log(groups);
    res.status(200).json(groups);
  } catch (error) {
    res.json(error);
  }
};

export const addGroup = async (req, res) => {
  console.log("e controller");

  const data = req.body;
  const newGroup = new Group({
    ...data,
  });

  try {
    await newGroup.save();
    res.json(newGroup);
  } catch (error) {
    console.log(error);
  }
};

export const addMessage = async (req, res) => {
  const { id: _id } = req.params;
  // console.log(_id)
  const group = req.body;
  // console.log(group)

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No group with this id");
  // console.log('ajungs?')
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      _id,
      { ...group, _id },
      { new: true }
    );
    res.json(updatedGroup);
  } catch (error) {
    console.log(error);
  }
};

export default router;
