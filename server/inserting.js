
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
const Registration = model.Registration;

export async function tickets(data ,eventVal) {

    try {
        const ticket = new Ticket({
            personName: data.personName,
            gender: data.gender,
            age: data.age,
            event : eventVal
        });
        await ticket.save();
        
        console.log(" added  sucessfully");

        return ticket;
    }
    catch (err) {
        console.log("error in inserting", err);
    }
}

export async function events(data) {

    try {
        const event = new Event({
            eventName: data.eventName,
            location: data.location,
            date: data.date ,
            price: data.price
        });
        await event.save();
        console.log("added  sucessfully");

        return event;
    }
    catch (err) {
        console.log("error in inserting", err);
    }
}

/////////////////////////////////////////////////////////////////////////////
export async function registrations(data) {

    try {
        const registration = new Registration({
            personName: data.personName,
            gender: data.gender,
            age: data.age,
            role: data.role
        });
        await registration.save();

        console.log(" added  sucessfully");

        return registration;
    }
    catch (err) {
        console.log("error in inserting", err);
    }
}