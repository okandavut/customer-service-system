import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, FormFile, Table, Form } from "react-bootstrap";
import getFormattedDate from "../../utils/dateFormatter";
const Service = (props) => {
  const [requests, setRequests] = useState([]);
  const [requestDetails, setRequestDetails] = useState({});
  const [newNote, setNote] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    getCustomerRequests();
  }, []);

  async function getCustomerRequests() {
    const res = await axios.get("http://localhost:3000/customerRequests");
    setRequests(res.data);
  }

  async function getRequestDetail(id) {
    console.log(id);

    const res = await axios.post(
      "http://localhost:3000/getCustomerRequestsById",
      { id: id }
    );
    setRequestDetails(res.data);
    setShow(true);

    console.log(res.data);
  }

  async function updateData() {
    if (newNote != "") {
      console.log(requestDetails._id)
      var requestStatus = requestDetails.status == "created" ? "started" : "closed";
      const res = await axios.put(
        "http://localhost:3000/updateCustomerRequest",
        {
          id: requestDetails._id,
          note: newNote,
          status: requestStatus,
          updatedDate: Date.now(),
        }
      );

      setShow(false);
      setNote("");
      setRequestDetails({});
      getCustomerRequests();
    }
  }
  return (
    <div className="container-main">
      <center>
        <h1 className="title">Customer Requests</h1>
      </center>
      <Table
        striped
        bordered
        hover
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
                    onClick={getRequestDetail.bind(this, item._id)}
                  >
                    Change State
                  </Button>
                </td>
              </tr>,
            ];
          })}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Request Name : {requestDetails.description}<br></br>
          Request Status : {requestDetails.status}
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Add Note:</Form.Label>
            <Form.Control as="textarea" rows="3" onChange={e => setNote(e.target.value)} />
          </Form.Group></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateData.bind()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
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
