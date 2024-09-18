const dotenv = require("dotenv");

dotenv.config();
module.exports = {PORT, MONGO_URL, JWT_SERVICE, REFRESH_TOKEN} = process.env;  
