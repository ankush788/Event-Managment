//jshint esversion:6  

////////////////////////////////////////importing modules
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";
const app = express();
import notifier from 'node-notifier';
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/////////////////////////////////////////////////////// importing file from other sourecs
import * as connection from "./server/connection.js";
import * as model from "./server/model.js";
import * as insert from "./server/inserting.js";

import * as query from "./server/query.js";

//////////////////////////////////////////// using imported files

connection.connecting();

const Ticket = model.Ticket;
const Event = model.Event;
const Registration = model.Registration;

/////////////////////////////////////////// server listening on port 3000

app.listen(port, function () {
  console.log("Server started on port 3000");
});

app.get("/", function (req, res) {

  res.render("home");
});

/////////////////////////////////////////// adding ticket to database

app.get("/add_ticket", function (req, res) {

  async function allEvent() {
    const allEvent = await query.EventFindAll();
    res.render("add_ticket", { events: allEvent });
  }
  allEvent();
});


app.post("/add_ticket", function (req, res) {

  async function add() {
    const eventVal = await query.EventFindName(req.body.eventName);

    const ticketVal = await insert.tickets(req.body, eventVal)

    res.render("Ticket_Details", { ticket: ticketVal });
  }

  add();

});

///////////////////////////////////////////////////// adding event to database


app.get("/add_event", function (req, res) {

  res.render("add_event");
});

app.post("/add_event", function (req, res) {

  async function add() {
    const eventVal = await insert.events(req.body);
    res.render("Event_Details", { event: eventVal });
  }

  add();
});




///////////////////////////////////////////// query page
app.get("/detail_query", function (req, res) {


  res.render("detail_query");
});



app.post("/detail_query", function (req, res) {

  const type = req.body.typeName;
  const Id = req.body.Id;

  console.log(req.body);

  if (type === "Ticket") {
    async function finding() {
      const ticketVal = await query.TicketFindId(Id);

      if (!ticketVal) {
        res.render("not_found");
      }

      res.render("Ticket_Details", { ticket: ticketVal });
    }

    finding();
  }

  else {

    async function finding() {
      const eventVal = await query.EventFindId(Id);

      if (!eventVal) {
        res.render("not_found");
      }

      res.render("Event_Details", { event: eventVal });
    }

    finding();
  }

});

////////////////////////////////////////////////////////////////////////registration 


app.get("/registration", function (req, res) {

  res.render("registration");
});

app.post("/registration", function (req, res) {

  async function add() {
    await insert.registrations(req.body);
    notifier.notify('Registered successfully!');

    res.redirect("/");

  }
  add();
});


/////////////////////////////////////////////////////////////////////////about 

app.get("/about", function (req, res) {

  res.render("about");
});

/////////////////////////////////////////////////////////////////////////////////delete 

app.get("/delete_query", function (req, res) {
  res.render("delete_query");
});


app.post("/delete_query", function (req, res) {

  const type = req.body.typeName;
  const Id = req.body.Id;

  console.log(req.body);

  if (type === "Ticket") {
    async function deleting() {
      const ticketVal = await query.TicketDeleteId(Id);

      if (!ticketVal) {
        notifier.notify('Ticket not found!');
        res.redirect("/");
      }
      else {
        notifier.notify('Ticket deleted successfully!');
        res.redirect("/");
      }
    }

    deleting();
  }

  else {

    async function deleting() {
      const eventVal = await query.EventDeleteId(Id);

      if (!eventVal) {
        notifier.notify('Event not found!');
        res.redirect("/");

      }

      else {
        notifier.notify('Event deleted successfully!');
        res.redirect("/");
      }
    }

    deleting();
  }

});

/////////////////////////////////////////////////////////////update event 
app.get("/update_event", function (req, res) {

  res.render("update_event");
});

app.post("/update_event", function (req, res) {

  async function update() {
    const eventVal = await query.EventFindId(req.body.Id);
    console.log("form body ", req.body);

    console.log("eventVal", eventVal);
    if (!eventVal) {
      notifier.notify('Event not found!');
      res.redirect("/");
    }

    else {

      if (req.body.eventName.length != 0) {
        eventVal.eventName = req.body.eventName;
      }

      if (req.body.location.length != 0) {
        eventVal.location = req.body.location;
      }

      if (req.body.price.length != 0) {
        eventVal.price = req.body.price;
      }
      if (req.body.date.length != 0) {
        eventVal.date = req.body.date;
      }

      console.log("eventVal body", eventVal);
      const Value = await query.EventUpdateId(eventVal._id, eventVal);
      notifier.notify('Event updated Sucessfully');

      console.log("final object", Value);
    
      res.render("Event_Details" ,{ event : Value});
    }
  }

  update();
});

















