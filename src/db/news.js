const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for new"],
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const News = model("news", newsSchema);
module.exports = News;
