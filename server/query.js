import * as model from "./model.js";
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const Ticket = model.Ticket;
const Event = model.Event;

///////////////////////////////////////////////////////////////////

export async function TicketFindId(Id) {
    try {
        const val = await Ticket.findOne({ _id: Id });
        console.log("find sucessfully ");
        return val;
    }
    catch (err) {
        console.log("err in finding ", err);
    }
}


export async function TicketDeleteId(Id) //TicketDeleteId
{
    try {
        const val = await Ticket.findOneAndDelete({ _id: Id });
        console.log("deleted sucessfully");

        return val;
    }
    catch (err) {
        console.log("error in deleting ", err);
    }
}

/////////////////////////////////////////////////////////////////////////////////
export async function EventFindAll() {
    try {
        const val = await Event.find();
        console.log("find sucessfully ");
        return val;
    }
    catch (err) {
        console.log("err in finding ", err);
    }
}


export async function EventFindId(Id) {
    try {
        const val = await Event.findOne({ _id: Id });
        console.log("find sucessfully ");
        return val;
    }
    catch (err) {
        console.log("err in finding ", err);
    }
}

export async function EventFindName(Name) {
    try {
        const val = await Event.findOne({ eventName: Name });
        console.log("find sucessfully ");
        return val;
    }
    catch (err) {
        console.log("err in finding ", err);
    }
}


export async function EventDeleteId(Id) {
    try {
        const val = await Event.findOneAndDelete({ _id: Id });
        console.log("deleted sucessfully");

        return val;
    }
    catch (err) {
        console.log("error in deleting ", err);

    }
}


export async function EventUpdateId(Id ,data) {
    try {

        const check = { _id: Id };
        const update = { eventName: data.eventName, location: data.location, date: data.date, price: data.price };
        const val = await Event.findByIdAndUpdate(check, {$set: update }, { new: true });

        console.log(" event is updated");

        return val;
    }
    catch (err) {
        console.log("error in updating ", err);
    }
}