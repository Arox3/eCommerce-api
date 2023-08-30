const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    description: { type: String, default: null },
    img: { type: String, default: null },
    category: { type: String, default: null },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

productSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "productIdNums",
  start_seq: 500,
});

module.exports = mongoose.model("product", productSchema);
