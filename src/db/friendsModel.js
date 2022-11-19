const { Schema, model } = require("mongoose");

const friendsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for new"],
    },
    url: {
      type: String,
    },
    addressUrl: { type: String },
    imageUrl: {
      type: String,
      default: false,
    },
    address: {
      type: String,
      default: null,
    },
    workDays: {
      type: Array,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    email: { type: String },
  },
  {
    versionKey: false
  }
);

const Friends = model("sponsors", friendsSchema);
module.exports = Friends;
