
# Recruitment project for Algolia


## Installing

This project is cut in 2 parts : the website that runs using webpack-dev-server and the server running using nodemon.

### Installing the server

1. Go to the server directory
2. Run `npm install`
3. Create an `algoliaKey` file in the directory and put the algolia adamin key for the project
4. Run `npm run initDb` to init the Database and import the data in it

You can now run the server with : 

```
npm start [--port <port>]
```  

The port is 3000 by default.


### Building the website

1. Go to the server directory
2. Run `npm install`
3. Run `npm run build-dev`
