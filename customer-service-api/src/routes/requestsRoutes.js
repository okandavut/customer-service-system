var express = require("express");
var requestsRouter = express.Router();

var requestsController = require("../controllers/requestsController");

requestsRouter.get("/customerRequests", requestsController.getCustomerRequests);
requestsRouter.post(
  "/crateCustomerRequest",
  requestsController.createCustomerRequest
);
requestsRouter.put(
  "/updateCustomerRequest",
  requestsController.updateCustomerRequest
);

requestsRouter.get(
  "/getCustomerRequestsByPhoneNumber",
  requestsController.getCustomerRequestsByPhoneNumber
);

module.exports = requestsRouter;
