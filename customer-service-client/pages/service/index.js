import React, { useState, useEffect } from "react";
import axios from "axios";

const Service = (props) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getCustomerRequests();
  }, []);

  const getCustomerRequests = async () => {
    const res = await axios.get("http://localhost:3000/customerRequests");
    setRequests(res.data);
  };

  function getRequestDetail(phoneNumber) {
    console.log(phoneNumber);
  }

  return (
    <div>
      <center>
        <h1>Customer Requests</h1>
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
          </tr>
        </thead>
        <tbody>
          {requests.map(function (item, i) {
            return [
              <tr key={i}  onClick={getRequestDetail.bind(this, item.customerPhone)}>
                <td>{item.description}</td>
                <td>{item.createdCustomerName}</td>
                <td>{item.note}</td>
                <td>{item.status}</td>
                <td>{item.customerPhone}</td>
                <td>{item.createdDate}</td>
                <td>{item.updatedDate}</td>
              </tr>,
            ];
          })}
        </tbody>
      </table>
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
