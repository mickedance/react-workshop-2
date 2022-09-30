import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "./Form";

const PersonTableHeader = () => {
    return (
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
    );
};
const PersonTableRow = (props) => {
    const history = useHistory();
    const [viewEdit, setViewEdit] = useState(false)
    const [selectedId, setSelectedId] = useState()
    const gotoDetails =(id)=>{ 
        history.push("/persondetails/"+id)       
    }

    const deleteById=(id)=>{
        axios.delete("http://localhost:8080/api/v1/person/"+id).then((response)=>{
        if(response.status===204)
            props.fetchDataFromDB();
        })
    }
    const showForm=(id)=>{
        if(viewEdit=== false && selectedId==null){
            setSelectedId(id)
            setViewEdit(true)
        }else if(viewEdit===true && selectedId===id){
            setViewEdit(false)
        }else if(viewEdit===false && selectedId!==id){
            setSelectedId(id)
            setViewEdit(true)
        }else if(viewEdit===false && selectedId===id){
            setViewEdit(true)
        }else if(viewEdit===true && selectedId!==id){
            setSelectedId(id)
        }
        
    }
    return (
        <>
       {props.persons.map((item)=>{
            return(
                <tbody key={item.id}>
                <tr >
                    <th>{item.id}</th>
                    <th>{item.firstName + " " + item.lastName}</th>
                    <th>{item.email}</th>
                    <th>
                        <button className="btn btn-primary btn-sm" onClick={()=>{gotoDetails(item.id)}} >Details</button>
                        <button className="btn btn-danger btn-sm" onClick={()=>{deleteById(item.id)}} >Delete</button>
                        <button className="btn btn-warning btn-sm" onClick={()=>{showForm(item.id)}} >Edit</button>
                    </th>
                </tr>
                {viewEdit && selectedId===item.id &&  <tr><td colSpan={4}><Form fetchDataFromDB={props.fetchDataFromDB} person={item} showForm={showForm} ></Form></td></tr>}
                </tbody>
            )
       })}

      </>
    );
};
const PersonTable = (props) => {
  return (
    <div className="row">
      <div className="col-8 offset-3">
        <table className="table">
          <PersonTableHeader></PersonTableHeader>
          <PersonTableRow
            persons={props.persons}
            fetchDataFromDB={props.fetchDataFromDB}
          ></PersonTableRow>
        </table>
      </div>
    </div>
  );
};

export default PersonTable;
