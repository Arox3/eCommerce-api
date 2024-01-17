const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, default: null },
    description: { type: String, default: null },
    price: { type: Number, default: null },
    productImage: { type: String, default: null },
  },
  { timestamps: true }
);

productSchema.plugin(AutoIncrement, {
  inc_field: "id",
  id: "productIdNums",
  start_seq: 500,
});

// ตังเมเอง

module.exports = mongoose.model("product", productSchema);
