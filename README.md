
# Recruitment project for Algolia


## Installing

This project is cut in 2 parts : the website that can run using webpack-dev-server or be served by the server and the server running using nodemon.

### Building the website

1. Go to the `website` directory
2. Run `npm install`
3. Run `npm run build-dev`

### Installing the server

1. Go to the `server` directory
2. Run `npm install`
3. Create an `algoliaKey` file in the directory and put the algolia adamin key for the project
`echo -n <yourKey> > algoliaKey`
4. Run `npm run initDb` to init the Database and import the data in it

You can now run the server with : 

```
npm start [--port <port>]
```  

The port is 3000 by default.

### Things that do not work properly

* The delete doesn't clean up the join tables for genres and actors
* The last search is not retriggered after you add a new movie

### Next steps

The things I'd make better/do if I had more time in no particular order : 

* Add unit tests on server side
* Finish adding the unit tests on components
* Better actor management with auto complete
* Add Algolia import into initDb (and rename it in initProject then :)
* Ask for the Algolia key in initDb to set up the project properly
* Better webpack/nodejs integration
* Figure out how to use sequelize properly or just drop it altogether to simplify the db management
* Add a view to see all the movie info
* Editing a movie
* upload images for poster and actors
* update the genres' list on the client side with Server sent events