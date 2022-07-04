const router = require('express').Router();
const connection = require('../database/db');
const dotenv = require('dotenv')
dotenv.config();
const Joi = require('joi');
const schema = require('../model/driver');


router.post('/add', async (req, res) => {

    try {
        const result = Joi.validate(req.body, schema.schema);
        if (result.error) {
            res.status(401).json({
                responseCode: '422',
                responseMsg: 'Validation Error',
                content: result.error.details[0].message
            });
        } else {
            var sql1 = "SELECT * FROM driver where user_Id=?";
            connection.query(sql1, [req.body.user_Id], await function (err, rows) {
                if (err) throw err
                if (rows[0] != null) {
                    res.status(401).json({
                        responseCode: '200',
                        responseMsg: 'Success',
                        content: "This driver" + " ( user_Id:" + req.body.user_Id + " )" + " Is Already In Database"
                    });
                } else {
                    var sql = "INSERT INTO driver (user_Id,user_name,vehicle_number,vehicle_type,password,email,contact,address,police_zone,insurance_Id) VALUES (?,?,?,?,?,?,?,?,?,?)";
                    connection.query(sql, [null, req.body.user_name, req.body.vehicle_number,  req.body.vehicle_type, req.body.password, req.body.email, req.body.contact, req.body.address, req.body.police_zone, req.body.insurance_Id], function (err, rows) {
                        if (!err) {
                            res.status(200).json({
                                responseCode: '200',
                                responseMsg: 'Success',
                                content: "Driver" + " ( user_Id:" + req.body.user_Id + " )" + " Is Added!"
                            });
                        } else {
                            throw err
                        }
                    })
                }
            })

        }

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
        var sql = "SELECT * FROM driver WHERE user_name LIKE '%" + req.params.id + "%'";
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

router.post('/sign', async (req, res) => {

    try {
            var sql1 = "SELECT * FROM driver where user_Id=?";
            connection.query(sql1, [req.body.user_Id], await function (err, rows) {
                if (err) throw err
                if (rows[0] != null) {
                    res.status(401).json({
                        responseCode: '200',
                        responseMsg: 'Success',
                        content: "This driver" + " ( user_Id:" + req.body.user_Id + " )" + " Is Already In Database"
                    });
                } else {
                    var sql = "INSERT INTO driver (user_Id,user_name,vehicle_number,password,email) VALUES (?,?,?,?,?)";
                    connection.query(sql, [null,req.body.user_name, req.body.vehicle_number, req.body.password, req.body.email], function (err, rows) {
                        if (!err) {
                            res.status(200).json({
                                responseCode: '200',
                                responseMsg: 'Success',
                                content: "Driver" + " ( user_Id:" + req.body.user_Id + " )" + " Is Added!"
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

router.post('/update', async (req, res) => {

    try {
            var sql1 = "SELECT * FROM driver where user_Id=?";
            connection.query(sql1, [req.body.user_Id], await function (err, rows) {
                if (err) throw err
                console.log(rows)
                if (rows[0] != null) {
                    var sql2 = "UPDATE driver SET user_name=?, vehicle_number=?, vehicle_type=?, password=?, email=?, contact=?, address=?, police_zone=?, insurance_Id=? where user_Id=?";
                    connection.query(sql2, [req.body.user_name, req.body.vehicle_number,  req.body.vehicle_type, req.body.password, req.body.email, req.body.contact, req.body.address, req.body.police_zone, req.body.insurance_Id, req.body.user_Id], function (err, rows) {
                        if (!err) {
                            res.status(200).json({
                                responseCode: '200',
                                responseMsg: 'Success',
                                content: "This Driver" + " ( user_Id:" + req.body.user_Id + " )" + " Is Updated"
                            });
                        }
                    })
                } else {
                    res.status(404).json({
                        responseCode: '404',
                        responseMsg: 'Not Found',
                        content: "This Driver" + " ( user_Id:" + req.body.user_Id + " )" + " Is Not Already In Store"
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