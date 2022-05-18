const db = require('./db');
const User = require('../models/user-model');
const Token = require('../models/token-model');

const seed = async () => {
  //await db.sync({ force: true });

  const password = `M<gC4`;
  const email = 'info@getaclue.me';
  const isActivated = true;
  const activationLink = `eyJhbGciOiJIUzI1Ni`;

  /*
  try {
    const token = await Token.create({
      user: 2,
      refreshToken: 'dhjbfhj-ddbjhjhd',
    });
    console.log(token);
    const addedToken = await Token.findOne({ where: { user: 2 } });
    console.log('token found in db', addedToken);
    db.close();
  } catch (error) {
    console.log(error);
  }
*/
  /*
  User.create({
    password: password,
    email: email,
    isActivated: isActivated,
    activationLink: activationLink,
  })
    .then((user) => {
      console.log('seeded user', user);
      */

  User.findOne({ where: { email } })
    .then((user) => {
      console.log('found in db after adding', user);
      db.close();
    })
    .catch((error) => {
      console.error('error looking for new user in db: ', error);
      db.close();
    });
};

seed();
