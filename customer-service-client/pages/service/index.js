import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import getFormattedDate from "../../utils/dateFormatter";
const Service = (props) => {
  const [requests, setRequests] = useState([]);
  const [requestDetails, setRequestDetails] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    getCustomerRequests();
  }, []);

  async function getCustomerRequests() {
    const res = await axios.get("http://localhost:3000/customerRequests");
    setRequests(res.data);
  }

  async function getRequestDetail(phoneNumber) {
    const res = await axios.post(
      "http://localhost:3000/getCustomerRequestsByPhoneNumber",
      { customerPhone: phoneNumber }
    );
    setRequestDetails({ description: res.data.description });
    setShow(true);

    console.log(res.data);
  }

  return (
    <div>
      <center>
        <h1 className="title">Customer Requests</h1>
      </center>
      <table className="service-list">
        <thead>
          <tr>
            <th>Description</th>
            <th>Customer</th>
            <th>Note</th>
            <th>Status</th>
            <th>Phone Number</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Change</th>
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
                <td>
                  <Button
                    variant="primary"
                    className="button"
                    onClick={getRequestDetail.bind(this, item.customerPhone)}
                  >
                    Change State
                  </Button>
                </td>
              </tr>,
            ];
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{requestDetails.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      value: 1,
    },
  };
};

export default Service;
