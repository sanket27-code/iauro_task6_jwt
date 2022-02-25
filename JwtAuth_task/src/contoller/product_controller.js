const fs = require('fs');
const json_file_connection = require("../servers/json_file_connection");

exports.getAllProducts = (req, res)=>{
    const allProducts = json_file_connection.allProducts;
    if(allProducts.length == 0){
        return res.send('No Product found!');
    }
    return res.send(allProducts);
}

exports.addProduct = (req, res)=>{
    const allProducts = json_file_connection.allProducts;
    const newProduct = req.body;
    allProducts.push(newProduct);

    fs.writeFileSync('./src/models/productData.json', JSON.stringify(allProducts,null,1));
    return res.send(newProduct);
}

exports.getOneProduct = (req, res)=>{
    const allProducts = json_file_connection.allProducts;
    const specificProduct = allProducts.filter((product)=>{
        return product.product == req.params.name;
    })
    if(specificProduct.length == 0){
        return res.send('No Product data found!');
    }
    return res.send(specificProduct);
}

exports.updateProduct = (req, res)=>{
    const allProducts = json_file_connection.allProducts;
    const specificProduct = allProducts.find((product)=>{
        return product.product == req.params.name;
    })
    if(!specificProduct){
        return res.send('No Product found, that to be updated!');
    }

    const updatedProducts = allProducts.map((product)=>{
        if(product.product == req.params.name){
            product.price = req.body.price;
        }
        return product;
    })
    fs.writeFileSync('./src/models/productData.json', JSON.stringify(updatedProducts,null,1));
    return res.send('updated successfully!');
}

exports.deleteProduct = (req, res)=>{
    const allProducts = json_file_connection.allProducts;
    const specificProduct = allProducts.find((product)=>{
        return product.product == req.params.name;
    })
    if(!specificProduct){
        return res.send('No Product found, that to be deleted!');
    }

    const updatedProducts = allProducts.filter((product)=>{
        return product.product != req.params.name;
    })
    fs.writeFileSync('./src/models/productData.json', JSON.stringify(updatedProducts,null,1));
    return res.send('deleted successfully!');
}