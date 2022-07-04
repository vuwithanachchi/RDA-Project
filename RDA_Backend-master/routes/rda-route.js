const router = require('express').Router();
const connection = require('../database/db');
const dotenv = require('dotenv')
const Joi = require("joi");
dotenv.config();


router.post('/add', async (req, res) => {

    try {
        var sql1 = "SELECT * FROM rda where rda_Id=?";
        connection.query(sql1, [req.body.rda_Id], await function (err, rows) {
            if (err) throw err
            if (rows[0] != null) {
                res.status(401).json({
                    responseCode: '200',
                    responseMsg: 'Success',
                    content: "This RDA" + " ( rda_Id:" + req.body.rda_Id + " )" + " Is Already In Database"
                });
            } else {
                var sql = "INSERT INTO rda (rda_Id,district,contact,email,password,status) VALUES (?,?,?,?,?,?)";
                connection.query(sql, [req.body.rda_Id, req.body.district, req.body.contact, req.body.email, req.body.password, req.body.status], function (err, rows) {
                    if (!err) {
                        res.status(200).json({
                            responseCode: '200',
                            responseMsg: 'Success',
                            content: "RDA" + " ( rda_Id:" + req.body.rda_Id + " )" + " Is Added!"
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
        var sql = "SELECT * FROM rda WHERE rda_Id LIKE '%" + req.params.id + "%'";
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