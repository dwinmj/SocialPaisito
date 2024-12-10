const express = require( "express");

const mongoose = require("mongoose");

const cors = require( "cors");
const fs = require( "fs" );

const morgan = require("morgan");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
})
.then(() => console.log("DB:Conected!"))
.catch((err) => console.log("DB:Connection Error : ",err));
// useFindAndModify:false,   useCreateIndex:true,

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

fs.readdirSync('./routes').map((rf) => app.use('/api',require(`./routes/${rf}`)));

const port = process.env.PORT || 8000;
app.listen(port,()=> console.log((`Server running on port:${port}`)));



