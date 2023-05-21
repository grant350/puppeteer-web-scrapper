db = db.getSiblingDB('crypto')
db.createCollection('coins');

db.coins.insertOne({});

db.createUser(
  {
      user: "grant",
      pwd: "password",
      roles: [
          {
              role: "readWrite",
              db: "crypto"
          }
      ]
  }
);
