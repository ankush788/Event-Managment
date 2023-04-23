
import mongoose from "mongoose";
export async function connecting() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/EVENT', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log("connection happen sucessfully ");
    }
    catch (err) {
        console.log("connection error ", err);
    }
}


