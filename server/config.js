const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  EV_PORT: process.env.PORT,
  EV_FB_API_KEY: process.env.FIREBASE_API_KEY,
  EV_FB_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  EV_FB_DB_URL: process.env.FIREBASE_DATABASE_URL,
  EV_FB_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
};
