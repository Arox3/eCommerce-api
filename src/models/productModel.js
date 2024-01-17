const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema(
  {
    product_id: { type: Number, default: null },
    product_name: { type: String, default: null },
    price: { type: Number, default: null },
    quantity: { type: Number, default: null },
    amount: { type: Number, default: null },
    detail: { type: Object, default: null },
  },
  { timestamps: true }
);

productSchema.plugin(AutoIncrement, {
  inc_field: "product_id",
  id: "productIdNums",
  start_seq: 500,
});

module.exports = mongoose.model("product", productSchema);
