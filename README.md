# This project serves as base for multi-site development using [Pattern Lab](https://patternlab.io/).

Created using current stable version of [Pattern Lab Node - Gulp Edition](https://github.com/pattern-lab/edition-node-gulp/releases/tag/v1.3.4) and [starterkit-mustache-demo](https://github.com/pattern-lab/starterkit-mustache-demo).

# Table of Contents
- [Folder Structure](#folder-structure)
- [Development workflow](#development-workflow)
- [Developing Starterkit](#develop-starterkit)
    - [Run/Test starterkit](#run-starterkit)
- [Developing Brand App](#develop-brand-app)
    - [Create Brand App](#create-brand-app)
    - [Load starterkit](#load-starterkit)
    - [Run/Test Brand App](#run-brand-app)
    - [Update starterkit](#update-starterkit)
- [Troubleshooting](#troubleshooting)

<a name="folder-structure"></a>
## Folder Structure
Primary folders seen in this project are listed here:
```
patternlab-multi-app-starterkit/
 ├──master-starterkit/       * Contains starterkit files to be used across all brands development.
 ├──master-starterkit-app/   * Patternlab Gulp Edition to run starterkit.
 ├──brand-app/               * Patternlab Gulp Edition to develop brand specific code.
```

<a name="development-workflow"></a>
## Development workflow

This section outlines Multi-site Development workflow -
- Create Starterkit app with basic templates and patterns that can be used across all Brand Apps.
- Each Brand App loads Starterkit and kicks off developing brand specific patterns or templates as needed.
- If a new reusable pattern is identified, then it is created in Starterkit app.
- Then, each Brand App pulls Starterkit to get the newly added Pattern in to Brand App code.

<a name="develop-starterkit"></a>
## Developing Starterkit
Starterkit contains a folder with the name `dist`. This is the folder in which all starterkit patterns are to be developed. This is created by cloning [starterkit-mustache-demo](https://github.com/pattern-lab/starterkit-mustache-demo) to provide demo code to kick-off development. Modify this code and remove unnecessary components to match project needs.

Screenshot here shows the folder structure for starterkit.

![Master starterkit folder structure](master-starterkit-folders.jpg)
- Brand App developers load all the files from `dist` folder to start Brand App development.
- Note that there are some folders with 'starterkit' in its name. These folders contain all patterns and associated assets.
- These are the folders that will be copied to Brand App when developers try to pull changes from Starterkit. So, it is important to make sure that all new patterns related changes need to be done inside the folders with **_starterkit_** in its name.

<a name="run-starterkit"></a>
### Run/Test starterkit
The folder `master-starterkit-app` is used to run starterkit code. This is a clone of Patternlab Gulp Edition which includes necessary tasks and Pattenlab Engine.

Requirements:

* [Node](https://nodejs.org/en/) with npm
* [Gulp](http://gulpjs.com/)

-- To install dependencies, navigate to `master-starterkit-app` in Terminal and run:

    npm install
	
-- To install dependencies, navigate to `master-starterkit` in Terminal and run:

    npm install

Installing dependencies is required only when trying to run for the first time.

-- Execute following command to run starterkit:

        gulp patternlab:serve

This will pick up code from `master-starterkit` folder, build it and launch in browser at [http://localhost:3000](http://localhost:3000)

-- Once the code is run, we can continue to make any edits and browser will load the changes.

-- Use `ctrl + c` to stop.

<a name="develop-brand-app"></a>
## Developing Brand App

<a name="create-brand-app"></a>
### Create Brand App
Brand App development starts by copying `brand-app` folder and renaming it as needed. `brand-app` is also a clone of Patternlab Gulp Edition. However, there are some gulp task customizations implemented to pull starterkit.

** Though `master-starterkit-app` and `brand-app` are clones of Pattern Gulp Edition, we need to copy `brand-app` for developing anything Brand specific. **

-- Install dependencies - navigate to new Brand app folder in Terminal and run:

    npm install

=======

Installing dependencies is required only when trying to run for the first time.

-- Execute following command to run starterkit:

        gulp patternlab:serve

This will pick up code from `master-starterkit` folder, build it and launch in browser at [http://localhost:3000](http://localhost:3000)

-- Once the code is run, we can continue to make any edits and browser will load the changes.

-- Use `ctrl + c` to stop.

<a name="develop-brand-app"></a>
## Developing Brand App

<a name="create-brand-app"></a>
### Create Brand App
Brand App development starts by copying `brand-app` folder and renaming it as needed. `brand-app` is also a clone of Patternlab Gulp Edition. However, there are some gulp task customizations implemented to pull starterkit.

** Though `master-starterkit-app` and `brand-app` are clones of Pattern Gulp Edition, we need to copy `brand-app` for developing anything Brand specific. **

-- Install dependencies - navigate to new Brand app folder in Terminal and run:

    npm install

>>>>>>> 259d1fd9f694e9cac70ae4baaf5417566c8308e8
Installing dependencies is required only when trying to run for the first time in this folder.

Once we have new brand app folder ready, our next step is to load starterkit into it start development.

<a name="load-starterkit"></a>
### Load starterkit
-- Run following command to load starterkit -

        gulp patternlab:loadstarterkit --kit=../../master-starterkit

This will copy everything from starterkit's `dist` folder to app folder's `source` folder.

<a name="run-brand-app"></a>
### Run/Test Brand App
-- Once starterkit is loaded, execute following command to run code from brand apps's source folder:

        gulp patternlab:serve

Once the app is running, you may implement any changes needed for brand and test them in browser.

<a name="update-starterkit"></a>
### Update starterkit
When there are any updates made to starterkit, they need to be pulled in to Brand App to be able to use them. Run following command to pull the changes:

        gulp updatestarterkit

This will copy content from starterkit to brand app. Note that this only copies folders that has 'starterkit' in its name. Folders that need to be copied can be configured in `starterkit-config.json` file.

 Few things to note here -


- **_While working on Brand App, do not make any changes to the files in folders with `starterkit` in its name. These will be overwritten when updatestarterkit command is run._**
- Create new folders to write Brand specific code and reference them from templates.
- You would also notice that `_patterns` doesn't have folders with the numbers 04, 05 and 06. These are skipped so that brand app can create folders 04-<brand_name>-atoms, 05-<brand_name>-molecules, 06-<brand_name>-organisms to include brand specific components.

<a name="troubleshooting"></a>
## Troubleshooting
When you try to run the command `gulp patternlab:serve`, if you receive error similar to `gulpInst.start.apply(gulpInst, toRun); TypeError: Cannot read property 'apply' of undefined`, then please run `npm i -g gulp-cli` and then try again. Read discussion related to it [here](https://github.com/gulpjs/gulp-cli/issues/84).
