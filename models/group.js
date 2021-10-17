import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  id: Number,
  title: String,
  img: String,
  createdAt: {
    day: String,
    month: String,
    year: String,
    hours: String,
    minutes: String,
  },
  messages: {
    type: Array,
    default: [],
  },
  creator: String,
  participants: {
    type: Array,
    default: [],
  },
});

var Group = mongoose.model("Group", groupSchema);

export default Group;
