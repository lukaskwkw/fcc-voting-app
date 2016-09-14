# fcc-voting-App

## Setting up the development environment

1.  Make sure you have Node.js with es6 support and npm installed
2.  Run `npm install` in project directory
3.  Place your mongoDB uri connection in .env file (create one) as `DB_URI`
    i.e. `DB_URI=mongodb://myUserName:myPassword@ds037005.mlab.com:37005/dbName`
3.b. Place keys: `KEY` for passwords encryption and `secret` for JWT authentication in .env file
    i.e.
    `KEY=12jfio2Sjv&#22`
    `secret=xx31iodEr42`

4.  If you wish you can insert some predefined polls data to your mongodb runing `node pollsInjection.js` script

## Usage

- `node server` will run application

## Testing

- Run `npm test`
