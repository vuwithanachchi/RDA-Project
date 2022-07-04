const router = require('express').Router();
const connection = require('../database/db');
const dotenv = require('dotenv')
const Joi = require("joi");
dotenv.config();


router.post('/add', async (req, res) => {

    try {
        var sql1 = "SELECT * FROM police where police_Id=?";
        connection.query(sql1, [req.body.police_Id], await function (err, rows) {
            if (err) throw err
            if (rows[0] != null) {
                res.status(401).json({
                    responseCode: '200',
                    responseMsg: 'Success',
                    content: "This Police" + " ( police_Id:" + req.body.police_Id + " )" + " Is Already In Database"
                });
            } else {
                var sql = "INSERT INTO police (police_Id,district,police_zone,contact,email,password,status) VALUES (?,?,?,?,?,?,?)";
                connection.query(sql, [req.body.police_Id, req.body.district,  req.body.police_zone, req.body.contact, req.body.email, req.body.password, req.body.status], function (err, rows) {
                    if (!err) {
                        res.status(200).json({
                            responseCode: '200',
                            responseMsg: 'Success',
                            content: "Police" + " ( police_Id:" + req.body.police_Id + " )" + " Is Added!"
                        });
                    } else {
                        throw err
                    }
                })
            }
        })



    } catch (err) {
        res.status(401).json({
            responseCode: '401',
            responseMsg: 'Error',
            content: 'internal server error'
        });
    }

})

router.get('/search/:id', async (req, res) => {

    try {
        var sql = "SELECT * FROM police WHERE police_Id LIKE '%" + req.params.id + "%'";
        connection.query(sql, [req.params.id], await function (err, rows) {
            if(err) throw new Error
            if (rows[0] != null) {
                res.status(200).json({
                    responseCode: '200',
                    responseMsg: 'Success',
                    content: rows
                });
            } else {
                res.status(200).json({
                    responseCode: '200',
                    responseMsg: 'Success',
                    content: null
                });
            }

        })
    } catch (error) {
        res.status(401).json({
            responseCode: '401',
            responseMsg: 'Error',
            content: 'internal server error'
        });
    }
})

module.exports = router