const express = require('express');
const product_routes = require('../routes/product_routes');
const auth_routes = require('../routes/auth_routes');

const app = express();
const PORT = process.env.PORT || 4008;

app.use(express.json());
app.use('/auth', auth_routes);
app.use('/product', product_routes);

// Running server on PORT
app.listen(PORT, ()=>{
    console.log(`server running on port: http://localhost:${PORT}`);
});