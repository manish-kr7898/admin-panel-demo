import { collection, getDocs } from "firebase/firestore";
import React, { Component, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../../firebase";

import ReactHTMLTableToExcel from "react-html-table-to-excel";

import "jspdf-autotable";
import { ReactToPrint } from "react-to-print";

function Contactus() {
  const [state, setState] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    Phone: "",
    message: "",
  });

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const { Firstname, Lastname, email, Phone, message } = state;

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "Contact"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setLoader(false);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      {/* <ReactHTMLTableToExcel
        className="btn btn-info"
        table="emp-table"
        filename="Emp Excel file"
        sheet="sheet"
        buttonText="Export to Excel"
      /> */}

      <div>
       <ReactToPrint
        trigger={()=>{
        return <button>Print the table</button>
        }}
       content = {()=>this.ComponentRef}
       documentTitle='new document'
       pageStyle='print'
       onAfterPrint={()=>{console.log('document printed')}}

       
       />


        <div ref={(el) => (this.ComponentRef = el)}>
          <table className="table" id="emp-table">
            <thead>
              <tr>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">email</th>
                <th scope="col">Phone</th>
                <th scope="col">message</th>
              </tr>
            </thead>
            <tbody>
              {data.map((Contact) => (
                <tr scope={Row.key}>
                  <td>{Contact.Firstname}</td>
                  <td>{Contact.Lastname}</td>
                  <td>{Contact.email}</td>
                  <td>{Contact.Phone}</td>
                  <td>{Contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Contactus;
