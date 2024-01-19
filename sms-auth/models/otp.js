const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phone: {
      type: "String",
      required: true,
    },

    code: {
      type: "String",
      required: true,
    },

    expTime: {
      type: Number,
      required: true,
    },

    // Use times -> type: Number, ++
  },
  { timestamps: true }
);

const model = mongoose.models.Otp || mongoose.model("Otp", schema);

module.exports = model;
