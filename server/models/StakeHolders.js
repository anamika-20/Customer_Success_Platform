import mongoose, { Schema } from "mongoose";

const stakeHoldersSchema = new Schema(
  {
    PM: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Auditor: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Client: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const StakeHolders = mongoose.model("StakeHolders", stakeHoldersSchema);

export default StakeHolders;
