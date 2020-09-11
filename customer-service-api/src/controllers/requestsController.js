const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const requestItem = new Schema({
  id: ObjectId,
  description: String,
  createdCustomerName: String,
  createdDate: Date,
  updatedDate: Date,
  status: String,
  customerPhone: String,
  note: String,
});

const requests = (module.exports = mongoose.model("requests", requestItem));

function getCustomerRequests(req, res) {
  requests.find({}, function (error, requests) {
    if (error) throw error;
    res.send(requests);
  });
}

function getCustomerRequestsByPhoneNumber(req, res) {
  requests.find({customerPhone : req.body.customerPhone}, function (error, requests) {
    if (error) throw error;
    res.send(requests);
  });
}

function getCustomerRequestsById(req, res) {
  var query = { _id: req.body.id };
  requests.findOne(query, function (error, requests) {
    if (error) throw error;
    res.send(requests);
  });
}

function createCustomerRequest(req, res) {
  req.body.createdDate = Date.now();
  requests.create(req.body, (err, request) => {
    if (err) {
      throw err;
    }
    res.send(request);
  });
}

function updateCustomerRequest(req, res) {
  var query = { _id: req.body.id };
  var update = {
    note: req.body.note,
    status: req.body.status,
    updatedDate: Date.now(), 
  };
  requests.findByIdAndUpdate(req.body.id, update, (err, request) => {
    if (err) {
      res.send({ success: "false" });
      throw err;
    }
    res.send({ success: "true" });
  });
}

module.exports = {
  getCustomerRequests,
  createCustomerRequest,
  updateCustomerRequest,
  getCustomerRequestsByPhoneNumber,
  getCustomerRequestsById
};
