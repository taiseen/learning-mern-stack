import config from '../config/index.js';
import mongoose from "mongoose";


const dbConnection = async () => {

    console.log('Server Start On Port :', config.port, '🟩');

    try {

        await mongoose.connect(config.dbURL);
        console.log("Connected To MongoDB ==> OK ✅");

    } catch (error) {

        console.error("Connection Error 🟥", error);
        // throw error;

    }
}


// mongoose.connection.on('disconnected', () => {
//     console.log('[Listener] ==> MongoDB Disconnected... 🟥');
// })

// mongoose.connection.on('connected', () => {
//     console.log('[Listener] ==> MongoDB Connected... ✅');
// })

export default dbConnection;