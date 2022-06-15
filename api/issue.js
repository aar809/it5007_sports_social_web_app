const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');
const { MongoClient, ObjectId } = require("mongodb");

async function list() {
  const db = getDb();
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
}

function ValidateNumber(strNumber) {
  var regExp = new RegExp("^\\d+$");
  var isValid = regExp.test(strNumber);
  return isValid;
}

function validate(booking, get_location_current) {
  const errors = [];
  //console.log("validate", booking)

  if (!ValidateNumber(booking.players)) {
    errors.push('Input must be numeric.');
  }

  if (booking.game === "" || !booking.game || booking.game == "null") {
    errors.push('Game must be indicated.');
  }

  if (get_location_current.length != 0) {
    errors.push('A game already exists.')
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }

}

function roundUpMinutes(date) {

  date.setHours(date.getHours() + Math.ceil(date.getMinutes() / 60));
  date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

  return date;
}

function roundDownMinutes(date) {

  date.setHours(date.getHours() + Math.floor(date.getMinutes() / 60));
  date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds

  return date;
}

async function add(_, { booking }) {
  const db = getDb();
  // Check if location needs to reset

  const booking_clash = await db.collection('bookings').find({ location: booking.location, date: booking.date, hour: booking.hour }).toArray();
  // console.log("booking clash", booking_clash, booking.location)
  validate(booking, booking_clash);

  const newBooking = Object.assign({}, booking);
  //newBooking.created = new Date();
  newBooking.id = await getNextSequence('bookings');
  //newBooking.id = 999 // test
  const result = await db.collection('bookings').insertOne(newBooking);
  const savedBooking = await db.collection('bookings')
    .findOne({ _id: result.insertedId });
  // console.log(newBooking.location, result.insertedId);
  const location_lookup = newBooking.location;
  const result_location = await db.collection('locations').update({ location: location_lookup }, { $set: { current: ObjectId(result.insertedId) } });
  //console.log(result_location);
  return savedBooking;
}

async function locationsList() {
  const db = getDb();
  const locations = await db.collection('locations').find({}).toArray();
  //console.log("locationsList", locations)
  return locations;
}

async function addJoin(_, { joinInput }) {
  const db = getDb();

  const newJoin = Object.assign({}, joinInput);
  // Use location.id to find ref
  // Update ref's player value 

  const location = joinInput.location;
  const players = joinInput.players;
  const date = joinInput.date;
  const hour = joinInput.hour;
  // console.log("date,hour", date, hour)

  const results = await db.collection('locations').find({
    location: location, date: date, hour: hour
  }).toArray();

  // const ref = results[0].current;

  // console.log(location, ObjectId(ref), players)
  // const upperTimeBound = (new Date().getHours()) + 1
  // const lowerTimeBound = new Date().getHours();

  const updates = await db.collection('bookings').updateOne(
    // {location : location, hour: {$gte: lowerTimeBound, $lt: upperTimeBound}},
    { location: location, hour: hour },
    { $inc: { "players": players } }
  );
  // console.log("Loc,hour", location, hour)
  return updates
}

async function bookingsList() {
  const db = getDb();
  const upperTimeBound = roundUpMinutes(new Date(new Date().getTime()))
  const lowerTimeBound = roundDownMinutes(new Date(new Date().getTime()))
  const bookings = await db.collection('bookings').find({
    created: {
      $gte: lowerTimeBound,
      $lt: upperTimeBound
    }
  }).toArray();
  return bookings
}

async function bookingsListAll() {
  const db = getDb();
  const allbookings = await db.collection('bookings').find({
  }).toArray();
  return allbookings
}

module.exports = { list, add, locationsList, bookingsList, addJoin, bookingsListAll };
