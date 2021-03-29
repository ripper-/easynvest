<img src="./src/assets/logo.png" alt="Logo of Easynvest" align="right">

# Easynvest Frontend Test &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)
> Code Corverage in 91.5%

A CRUD Frontend Test Project, usign localstorage to save the informations.
this project was made only in HTML, Javascript and CSS

## Installing / Getting started

To Run this project you need first to add the dependencies

```shell
yarn
```

then you can run it by:

```shell
yarn start
```

it uses the 3000 port in you localhost

## Developing

### Built With
The project was created using only Javascript.
but for development, i used
> express: to create a server build.
> nodemon: for the build, to refress after every code changes
> surcrase: changes the module.export and require, to import and export
> jest: a test framework


### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/ripper-/easynvest.git
cd easynvest/
yarn
yarn start
```

## Tests

I'm using Jest to run the tests on the javascript files.
to run just use:

```shell
jest
```

or to see the coverage

```shell
jest --coverage
```

## Reference

this all were created based on the test exercise from:
> https://github.com/easynvest/teste-front-end


## Database

Using Localsotorage to save the information
initial information come from:
> GET https://private-21e8de-rafaellucio.apiary-mock.com/users
