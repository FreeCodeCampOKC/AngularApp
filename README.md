# Angular Chat App
An Angular Chat App built for Free Code Camp Oklahoma City.

##Prerequisites

* Install [Node](https://nodejs.org/en/)
    * You can verify whether node is installed by running `node -v`
    * This will return the version number if it is installed, and an error if it isn't.
* Run `sudo npm update -g npm` to update [npm](https://www.npmjs.com/)
* Run `sudo npm install -g grunt-cli` to install [Grunt CLI](http://gruntjs.com/getting-started)
* Run `sudo npm install -g karma-cli` to install [Karma CLI](https://github.com/karma-runner/karma-cli)

##To Start

* [Fork](https://help.github.com/articles/fork-a-repo/) the repository, and create a local clone of your fork
* In the root directory (the folder containing the package.json file), run `npm install` to install required modules
* In the /public directory run `bower install` to install the required front end libraries
* Run the `grunt` command in the command line. This will run the following tasks:
    * Concat files (combine all the source code into a single JavaScript file)
    * Start server
* Navigate your browser to `localhost:3000`

##File Tree
The server is located in the `/server` directory. </br>
The front end files are located in `/public/` directory.

##Angular Style Guide
[Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
