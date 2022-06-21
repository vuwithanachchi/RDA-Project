const Joi=require('joi');

const schema=Joi.object().keys({
    accident_Id:Joi.string(),
    user_Id:Joi.string(),
    vehicle_number:Joi.string(),
    user_name:Joi.string(),
    vehicle_type:Joi.string(),
    police_zone:Joi.string(),
    location:Joi.string(),
    insurance_Id :Joi.string()
});

module.exports={
    schema
}