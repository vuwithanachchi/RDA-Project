const express = require('express');
const driver=require('./routes/driver-route');
const accident=require('./routes/Accident-route.js');
const insurance=require('./routes/insurance-route');
const police=require('./routes/police-route');
const rda=require('./routes/rda-route');
const index = express();
var cors = require('cors');

index.use(cors())
index.use(express.json());
index.use(express.urlencoded({
    extended: true
}));

index.use('/api/v1/driver',driver);
index.use('/api/v1/accident',accident);
index.use('/api/v1/insurance',insurance);
index.use('/api/v1/police',police);
index.use('/api/v1/rda',rda);


index.listen(5000, () => console.log('server is started!'));