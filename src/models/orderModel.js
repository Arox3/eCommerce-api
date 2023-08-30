const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, default: null },
    address: { type: String, default: null },
    products: [Object],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

orderSchema.plugin(AutoIncrement, {
  inc_field: "orderID",
  id: "orderIdNums",
  start_seq: 10000,
});

module.exports = mongoose.model("order", orderSchema);
