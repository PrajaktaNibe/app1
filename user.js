const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.post('/user/login', (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    const statement = `select id, firstName, lastName, email from User where email ='${email}' and password = '${password}'`;
    const connection = db.connect();
    connection.query(statement, (error, users) => {
        connection.end();

        const result = {};
        if (error) {
            result['status'] = 'error';
            result['error'] = error;
        } else {
            if (users.length == 0) {
                // user doesnot exist
                result['status'] = 'error';
                result['error'] = 'invalid email or password';
            } else {
                // user exists
                result['status'] = 'success';
                result['data'] = users[0];
            }
        }
        
        response.send(result);
    });
});

module.exports = router;