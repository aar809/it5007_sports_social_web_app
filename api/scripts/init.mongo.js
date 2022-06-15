/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.issues.remove({});
db.bookings.remove({});
db.locations.remove({});
// db.userinfo.remove({});

const fixedLocations = [
  {
    id: 1, 
    location: 'NUS Multipurpose Hall 1, Court 1',
    created: null,
    Game: null,
    Players: null,
    Tags: null,
    current: null,
  },
  {
    id: 2, 
    location: 'NUS Multipurpose Hall 1, Court 2',
    created: null,
    Game: null,
    Players: null,
    Tags: null,
    current: null,
  },
  {
    id: 3, 
    location: 'NUS Multipurpose Hall 2, Court 1',
    created: null,
    Game: null,
    Players: null,
    Tags: null,
    current: null,
  },
  {
    id: 4, 
    location: 'NUS Multipurpose Hall 2, Court 2',
    created: null,
    Game: null,
    Players: null,
    Tags: null,
    current: null,
  },
  {
    id: 5, 
    location: 'NUS Pickleball Courts',
    created: null, 
    Game: null,
    Players: null,
    Tags: null,
    current: null,
  },
  {
    id: 6, 
    location: 'NUS Soccer Field',
    created: null, 
    Game: null,
    Players: null,
    Tags: null,
    current: null,
  },
  {
    id: 7, 
    location: 'NUS UTown Towngreen',
    created: null, 
    Game: null,
    Players: null,
    Tags: null,
    current: null,
  },
];

db.locations.insertMany(fixedLocations);
var count = db.locations.count();
print('Inserted', count, 'events into locations table');

db.counters.remove({ _id: 'bookings' });
db.counters.insert({ _id: 'bookings', current: count });

db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });

db.bookings.createIndex({ id: 1 }, { unique: true });