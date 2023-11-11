import mongoose from "mongoose";

const blood_inventorySchema = new mongoose.Schema({
   A_plus_unit:{
      type:Number
   },
   B_plus_unit:{
      type:Number
   },
   A_minus_unit:{
      type:Number
   },
   B_minus_unit:{
      type:Number
   },
   AB_plus_unit:{
      type:Number
   },
   AB_minus_unit:{
      type:Number
   },
   O_plus_unit:{
      type:Number
   },
   O_minus_unit:{
      type:Number
   },
   Cost_of_blood:{
      type:Number
   },
   email:{
      type:String
   }
});
export const blood_bank_inventory = mongoose.model("blood_bank_inventory",blood_inventorySchema);


