const express = require('express')
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require('./middleware/errorMiddleware')



const app = express()
const PORT = process.env.PORT || 5454
connectDB()

app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

app.use(notFound)
app.use(errorHandler)

const server =  app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`.blue.italic.underline)
})


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on("connection", (socket) => {
  console.log("Connected to socket.io")

  socket.on("setup",(userData) =>{
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat',(room)=>{
    socket.join(room)
    console.log('User Joined with room id : ' + room)

    socket.on('new message',(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat
        if(!chat.users) return console.log('chat.users is not define')

       
        chat.users.forEach(user =>{
            if(user._id == newMessageRecieved.sender._id) return

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        })
    })
  })
}); 