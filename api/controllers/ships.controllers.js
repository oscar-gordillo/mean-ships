const mongoose = require("mongoose");
const Ship = mongoose.model(process.env.SHIP_MODEL);

const getShipsType = function (req, res) {

    Ship.find().distinct('feature_type',function (err, ships) {    
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getAll = function (req, res) {
    let offset=0;
    let count=5;
    console.log("count",req.query.count);
    if (req.query && req.query.offset) {
        offset=req.query.offset;
    }
    if (req.query && req.query.count) {
        count=req.query.count;
    }

    let query={};

    

    if(req.query && req.query.lat && req.query.lng){
        
        const lng=parseFloat(req.query.lng);
        const lat=parseFloat(req.query.lat);
        const point= {type:"Point",coordinates: [lng,lat]}; //Stores lng then lat
        console.log(point.coordinates);

        let minDistance=0;
        if (req.query.minDistance) {
            minDistance=req.query.minDistance;
        }
        let maxDistance=10000;
        if (req.query.maxDistance) {
            maxDistance=req.query.maxDistance;
        }

        query = {"coordinates":{
                $near: {
                    $geometry: point,
                    $maxDistance: maxDistance,
                    $minDistance: minDistance
                }
            }
        };        
    }

    if (req.query && req.query.type && req.query.type!="ALL") {
        query.feature_type=req.query.type;
    }

    console.log(query);    

    let sort = {};

    sort._id=1;


    Ship.find(query).skip(offset).limit(count).sort(sort).exec(function (err, ships) {        
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const shipId = req.params.shipId;
    Ship.findById(shipId).exec(function (err, ship) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ship
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!ship) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    getShipsType:getShipsType
};