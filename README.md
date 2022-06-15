# App

If you are starting the application for the first time, run the following:

```
npm install env-cmd
```

## Development on Local Machine
In \api
```
npm install
```

In \ui
```
npm install

npm run compile:development
```

To start the development environment 

root
```
# Start database
mongod
```

\api
```
npm run start:development
```

\ui
```
# Autocompile
npm run watch
```

\ui
```
npm start
```

After successfully setting up the development environment, you should have 4 Shells running. 

## Starting on Production Cloud

```
npm install env-cmd
```

In \api
```
npm install
```

In \ui
```
npm install

npm run compile:production
```

To start the production environment 

root
```
# Start database
mongod
```

\api
```
# Init database
mongo issuetracker scripts/init.mongo.js
```

\api
```
npm run start:production
```

\ui
```
# Autocompile
npm run watch
```

\ui
```
npm run start:production
```

### Notes
Resolvers are found in api/api_handler.js

### To install bootstrap
/ui
```
npm install --save-dev css-loader@4

npm install --save-dev style-loader@2

npm install --save-dev jquery popper.js
```
