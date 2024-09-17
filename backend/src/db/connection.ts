import { connect, disconnect } from "mongoose";
async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL);
    } catch(error){
        console.log(error);
        throw new Error("Unable to connect to the database");
    }
}

async function disconnectFromDatabase(){
    try{
        await disconnect();
    } catch (error){
        console.log(error);
        throw new Error("Disconnection from Database failed");
    }
}

export { connectToDatabase, disconnectFromDatabase };
