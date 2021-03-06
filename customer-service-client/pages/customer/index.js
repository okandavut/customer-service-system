import React, { useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";import axios from "axios";
import getFormattedDate from "../../utils/dateFormatter";

function Customer() {
  const [requests, setRequests] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  async function getRequestDetail(phoneNumber) {
    console.log(phoneNumber);
    const res = await axios.post(
      "http://localhost:3000/getCustomerRequestsByPhoneNumber",
      { customerPhone: phoneNumber }
    );
    setRequests(res.data);
    console.log(res.data);
  }
  return (
    <div className="container-main">
      <center>
        <h3 className="title">Check Your Request Status</h3>
      </center>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button
              variant="primary"
              size="lg"
              type="button"
              onClick={getRequestDetail.bind(this, phoneNumber)}
              s
            >
              Submit
            </Button>
          </Col>
        </Row>
        <br />
      </Form>
      <Table
        striped
        bordered
        hover
        style={{
          display: requests.length !== 0 ? "table" : "none",
        }}
      >
        <thead>
          <tr>
            <th>Description</th>
            <th>Customer</th>
            <th>Note</th>
            <th>Status</th>
            <th>Phone Number</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(function (item, i) {
            return [
              <tr key={i}>
                <td>{item.description}</td>
                <td>{item.createdCustomerName}</td>
                <td>{item.note}</td>
                <td>{item.status}</td>
                <td>{item.customerPhone}</td>
                <td>{getFormattedDate(item.createdDate)}</td>
                <td>{getFormattedDate(item.updatedDate)}</td>

              </tr>,
            ];
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Customer;
