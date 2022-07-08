import "../serviceform/service.scss";
import { DataGrid } from "@mui/x-data-grid";

import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  snapshotEqual,
} from "firebase/firestore";
import { db } from "../../../firebase";

export default function ServiceList() {
  const [data, setData] = useState([]);

  useEffect(() => {
   

    const unsub = onSnapshot(collection(db, "service"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list)
    },(error)=>{
     console.log(error);
    });
    return () => {
      unsub();
    }
  }, []);

  console.log(data);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "service", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "servicestitle", headerName: "Servicestitle", width: 130 },
    {
      field: "serviceimg",
      headerName: "ServiceImg",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="services">
            <img className="servicesImg" src={params.row.img} alt="img" />
          </div>
        );
      },
    },
    { field: "services", headerName: "Services", width: 150 },
    { field: "discription", headerName: "Discription", width: 210 },
   
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/service/" + params.row.id}>
              <button className="serviceListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="serviceListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="service">
      <div className="datatableTitle">
        Add new Services
        <Link to="/News" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
