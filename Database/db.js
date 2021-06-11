const mongoose = require('mongoose');

//MONGOOSE CONNECTION
mongoose
    .connect(process.env.MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false })
    .then(() => {
        console.log("mongoDB Connected");
    })
    .catch((err) => {
        console.log(err.message);
    })

//CONNECTED CALLBACK FUNCTION
mongoose.connection.on('connected', () => {
    console.log("mongoose connected to Db");
})

//ERROR CALLBACK FUNCTION 
mongoose.connection.on('error', (err) => {
    console.log(err.message);
})

//DISCONNECTED CALLBACK FUNCTION 
mongoose.connection.on('disconnected', () => {
    console.log("mongoose connection is disconnected");
})

//THIS FUNCTION RUNS WHEN WE STOP THE APPLICATION (CONTROL+C)
process.on('SIGINT', async() => {
    await mongoose.connection.close(); //DISCONNECTED CALLBACK FUNCTION
    process.exit(0);
})