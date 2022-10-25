const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')



const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  pic: {
    type: String,
    default:
      "https://tse1.mm.bing.net/th?id=OIP.zsaaVp0tIiSnOK-1rYpBnwAAAA&pid=Api&P=0&w=181&h=181",
  },
},{
    timeStamps:true
});

userSchema.methods.matchPassword = async function( enterPassword){
  return await bcrypt.compare(enterPassword, this.password)
}

userSchema.pre('save', async function(next){
  if(!this.isModified){
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})
const User = mongoose.model("User",userSchema)

module.exports = User