const fs = require('fs');

exports.allProducts = JSON.parse(fs.readFileSync('./src/models/productData.json'));

exports.allUsers = JSON.parse(fs.readFileSync('./src/models/userData.json'));