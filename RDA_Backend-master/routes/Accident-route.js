const router = require('express').Router();
const connection = require('../database/db');
const dotenv = require('dotenv')
dotenv.config();
const Joi = require('joi');
const schema = require('../model/accident');
const uploadFile = require("../middleware/upload");
const fs = require("fs");


router.post('/add', async (req, res) => {

    try {
            var sql1 = "SELECT * FROM accident where accident_Id=?";
            connection.query(sql1, [req.body.accident_Id], await function (err, rows) {
                if (err) throw err
                if (rows[0] != null) {
                    res.status(401).json({
                        responseCode: '200',
                        responseMsg: 'Success',
                        content: "This Accident" + " ( accident_Id:" + req.body.accident_Id + " )" + " Is Already In Database"
                    });
                } else {
                    var sql = "INSERT INTO accident (accident_Id,user_Id,vehicle_number,user_name,vehicle_type,police_zone,location,insurance_Id) VALUES (?,?,?,?,?,?,?,?)";
                    connection.query(sql, [req.body.accident_Id,req.body.user_Id, req.body.vehicle_number,  req.body.user_name, req.body.vehicle_type, req.body.police_zone, req.body.location, req.body.insurance_Id], function (err, rows) {
                        if (!err) {
                            res.status(200).json({
                                responseCode: '200',
                                responseMsg: 'Success',
                                content: "Accident" + " ( accident_Id:" + req.body.accident_Id + " )" + " Is Added!"
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

});

router.post('/upload', async (req, res) => {

    try {
        await uploadFile(req, res);
        console.log(req.file);
        console.log(req.file.filename)
        // console.log(res.status())
            var sql1 = "SELECT * FROM img where image_Id=?";
            connection.query(sql1, [req.body.image_Id], await function (err, rows) {
                if (err) throw err
                if (rows[0] != null) {
                    res.status(401).json({
                        responseCode: '401',
                        responseMsg: 'UnSuccessful',
                        content: "This Image" + " ( image_Id:" + req.body.image_Id + " )" + " Is Already In Store",
                        message: "This Image" + " ( image_Id:" + req.body.image_Id + " )" + " Is Already In Store"
                    });
                } else {
                    var sql = "INSERT INTO img (image_Id,img_path,accident_Id) VALUES (?,?,?)";
                    connection.query(sql, [null,req.file.filename, req.body.accident_Id], function (err, rows) {
                        if (!err) {

                            res.status(200).json({
                                responseCode: '200',
                                responseMsg: 'Success',
                                content: "Uploaded the file successfully: " + req.file.originalname,
                                message: "Uploaded the file successfully: " + req.file.originalname,
                            });
                        } else {
                            throw err
                        }
                    })
                }
            })



    } catch (err) {
        res.status(500).json({
            responseCode: '401',
            responseMsg: 'Error',
            content: `Could not upload the file: ${req.file.originalname}. ${err}`,
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }

    // try {
    //     await uploadFile(req, res);
    //     if (req.file == undefined) {
    //         return res.status(400).send({ message: "Please upload a file!" });
    //     }
    //     res.status(200).send({
    //         message: "Uploaded the file successfully: " + req.file.originalname,
    //     });
    // } catch (err) {
    //     res.status(500).send({
    //         message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    //     });
    // }


})
router.get('/files', async (req, res) => {

    // const getListFiles = (req, res) => {
        const directoryPath = "./uploads/";
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                res.status(500).send({
                    message: "Unable to scan files!",
                });
            }
            let fileInfos = [];
            files.forEach((file) => {
                fileInfos.push({
                    name: file,
                    url: 'E:/S-Code Solutions/RDA project/RDA_API/uploads/' + file,
                });
            });
            res.status(200).send(fileInfos);
        });
    // };
})

router.get('/search/:id', async (req, res) => {

    try {
        var sql = "SELECT * FROM accident WHERE user_name LIKE '%" + req.params.id + "%'";
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

router.get('/imgsearch/:id', async (req, res) => {

    try {
        var sql = "SELECT * FROM img WHERE accident_Id LIKE '%" + req.params.id + "%'";
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