const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const json_file_connection = require("../servers/json_file_connection");

exports.registerUser = async (req, res) => {
    const users = json_file_connection.allUsers;
    const emailExist = users.find((user) => {
        return user.email == req.body.email;
    })
    if (emailExist) {
        return res.status(401).send('Email exist!');
    }
    try {
        const user = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        users.push({ ...user, password: hashPassword });
        fs.writeFileSync('./src/models/userData.json', JSON.stringify(users, null, 1));
        return res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.loginUser = async (req, res) => {
    const users = json_file_connection.allUsers;
    const emailExist = users.find((user) => {
        return user.email == req.body.email;
    })
    if (!emailExist) {
        return res.status(401).send('Email not found!');
    }
    const passwordValid = await bcrypt.compare(req.body.password, emailExist.password);
    if(!passwordValid){
        return res.status(401).send('Invalid Password!');
    }
    try {
        const token = jwt.sign({email: req.body.email}, "abcdefgh");
        res.header('auth-token',token).send(token);
    } catch (error) {
        res.status(400).send(error);
    }
}