const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    amount: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Food", "Rent", "Travel", "Health", "Others", "Luxury"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
