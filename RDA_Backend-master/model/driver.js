const Joi=require('joi');

const schema=Joi.object().keys({
    user_Id:Joi.string(),
    user_name:Joi.string(),
    vehicle_number:Joi.string(),
    vehicle_type:Joi.string(),
    password:Joi.string(),
    email:Joi.string(),
    contact :Joi.string(),
    address :Joi.string(),
    police_zone :Joi.string(),
    insurance_Id :Joi.string()
});

module.exports={
    schema
}