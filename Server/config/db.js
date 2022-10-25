const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(
          "mongodb+srv://MubashirJaweed:35697008@cluster0.xcuzvwy.mongodb.net/?retryWrites=true&w=majority",
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        );

        console.log(`mongodb successfully connected  ${conn.connection.host}`.magenta.italic.underline);
    }
    catch(error){
        console.log(`error ${error.message}`.red.bold.underline);
        process.exit()
    }
}

module.exports = connectDB