const db = require('./db');
const User = require('../models/user-model');

const seed = async () => {
  //await db.sync({ force: true });

  const password = `M<gC4`;
  const email = 'info@getaclue.me';
  const isActivated = true;
  const activationLink = `eyJhbGciOiJIUzI1Ni`;

  User.create({
    password: password,
    email: email,
    isActivated: isActivated,
    activationLink: activationLink,
  })
    .then((user) => {
      console.log('seeded user', user);
      User.findOne({ where: { email: `${user.email}` } })
        .then((user) => {
          console.log('found in db after adding');
          db.close();
        })
        .catch((error) => {
          console.error('error looking for new user in db: ', error);
          db.close();
        });
    })
    .catch((error) => {
      console.error('failed to seed, ', error);
      db.close();
    });
};

seed();
