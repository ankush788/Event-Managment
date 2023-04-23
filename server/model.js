
import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
    eventName:
    {
        type: String,
        required: true,

    },

    location:
    {
        type: String,
        required: true,
    },
   date :
   {
        type: Date,
        required: true
   },

    price:
    {
        type: Number,
        required: true
    }

});

const TicketSchema = new mongoose.Schema({
    personName:
    {
        type: String,
        required: true
    },

    gender:
    {
        type :String,
        required: true

    },
    age:
    {
         type :Number,
        required: true
    },
    
    event:                   ///embedded other schema in our current schema
    {
        type: EventSchema

    },
});


const RegistrationSchema = new mongoose.Schema(
    {
        personName:
        {
            type: String,
            required: true
        },

        gender:
        {
            type: String,
            required: true

        },
        age:
        {
            type: Number,
            required: true
        },
        
        role :
        {
         type :String,
         required :true 
        }
    }
)

export const Ticket = new mongoose.model("Ticket", TicketSchema);
export const Event = new mongoose.model("Event", EventSchema);

export const Registration = new mongoose.model("Registration", RegistrationSchema);
