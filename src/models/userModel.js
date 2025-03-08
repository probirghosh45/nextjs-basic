import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

   forgotPasswordToken : String,
   forgotPasswordExpiry : Date,
   verifyToken : String,
   vertifyTokenExpiry : Date
});


// const User = mongoose.models.users || mongoose.model("users",userSchema)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
