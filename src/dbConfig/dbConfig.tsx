import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!)

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('connected to database');
        })

        connection.on('error', (error)=>{
            console.log('error connecting to database', error);
            process.exit()
        })

    } catch (error) {
        console.log("something went wrong");
        console.log(error);
    }
}
