import app from "./app.js"; //Importing the file from app.ts to use express and connect to a port
import { connectToDatabase } from "./db/connection.js";

//connections to listen at port 1000
const PORT = process.env.PORT || 1000;
connectToDatabase().then(()=>{
    app.listen(PORT,()=>
        console.log(" Serven Open for listening and Connected to MongoDB")
    );
}).catch((err) =>console.log(err));