import mongoose from "mongoose";

// Defining Schema
// var A ="A+_unit";var B ="B+_unit";var A_ ="A-_unit";var B_ ="B-_unit";var AB ="AB+_unit";var AB_ ="AB-_unit";var o ="o+_unit";var o_ ="o-_unit";
// var Cost_of_blood="Cost_of_blood";

const blood_inventorySchema = new mongoose.Schema({
   A_plus_unit: {
      type: Number,
      required: true,
      trim: true
   },
   B_plus_unit: {
      type: Number,
      required: true,
      trim: true
   },
   A_minus_unit: {
      type: Number,
      required: true,
      trim: true
   },
   B_minus_unit: {
      type: Number,
      required: true,
      unique: true,
      trim: true
   },
   AB_plus_unit: {
      type: Number,
      required: true,
      trim: true
   },
   AB_minus_unit: {
      type: Number,
      required: true,
      trim: true
   },
   O_plus_unit: {
      type: Number,
      required: true,
      trim: true
   },
   O_minus_unit: {
      type: Number,
      required: true,
      trim: true
   },
   Cost_of_blood: {
      type: Number,
      required: true,
      trim: true
   },

});
export const blood_bank_inventory = mongoose.model("blood_bank_inventory", blood_inventorySchema);


