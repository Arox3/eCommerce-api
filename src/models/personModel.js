const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const personSchema = new mongoose.Schema(
  {
    id: { type: Number, default: null },
    name: { type: String, default: null },
    avatar: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    countryCode: { type: String, default: null },
  },
  { timestamps: true }
);

personSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "personIdNums",
  start_seq: 1,
});

module.exports = mongoose.model("person", personSchema);
