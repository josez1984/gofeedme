const express = require('express');
const router = express.Router();
const multer = require("multer");

var inventory = require("../models/inventory.js");
var users = require("../models/users.js");

router.delete('/api/inventory', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply a 'user_id' to update inventory."
        });
    }
    
    if(!httpReq.body.id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply an 'id' to update inventory."
        });
    }

    inventory.update({
        deleted: 1
    }, {
        key: "id",
        val: httpReq.body.id
    }, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});

router.put('/api/inventory', function(httpReq, httpRes) {
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply a 'user_id' to update inventory."
        });
    }

    if(!httpReq.body.id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply an 'id' to update inventory."
        });
    }

    var updateObj = {
        name: httpReq.body.name,
        description: httpReq.body.description,
        quantity: httpReq.body.quantity,
        deleted: httpReq.body.deleted
    }
    
    var where = {
        key: "id",
        val: httpReq.body.id
    };

    inventory.update(updateObj, where, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    })
});

router.post('/api/inventory', function(httpReq, httpRes){
    if(!httpReq.body.user_id) {
        return httpRes.status(401).json({ 
            result: "error",
            message: "You must supply a 'user_id' to post inventory."
        });
    }

    var columns = [
        "name",
        "description",
        "quantity",
        "user_id"
    ];

    var values = [
        httpReq.body.name,
        httpReq.body.description,
        httpReq.body.quantity,
        httpReq.body.user_id     
    ];

    inventory.insert(columns, values, function(err, res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    });
});

router.post('/api/users/login', function(httpReq, httpRes) {
    if(!httpReq.body.name) {
        httpRes.status(404).json({ error: "You must supply a username." });
    } else {
        
    }
});

router.post('/api/users', function(httpReq, httpRes) {    
    users.insert([
        "name",
        "password",
        "user_type"
    ], [
        httpReq.body.name,
        httpReq.body.password,
        httpReq.body.user_type
    ], function(err,res) {
        if(err) {
            return httpRes.status(500).json({ error: err });
        }
        httpRes.status(200).json(res);
    });
});

router.post('/', function(httpReq, httpRes) {
    if(!httpReq.body.name) {

    }
});

module.exports = router;