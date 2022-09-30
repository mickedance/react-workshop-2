import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const PersonDetails = () => {
  let params = useParams();
  let history = useHistory();
  console.log(params.id)
  const [person, setPerson] = useState({});
  useEffect(() => {
    const url = "http://localhost:8080/api/v1/person/"+params.id;
    axios.get(url).then((response) => {
      console.log(response.data);
      if (response.status == 200) {
        setPerson(response.data);
      }
    });
  }, []);
  return (
    <div className="row">
      <div className="col-3 offset-3">
        <div className="card">
          <div class="card-body">
            <h5 className="card-title">Person Info</h5>
            <h6 className="card-subtitle mb-2 text-muted">{person.title}</h6>
            <p claclassNamess="card-text">
              Name: {person.firstName + person.lastName}
              <br></br>
              Id: {person.id}
              <br></br>
              Email: {person.email}
            </p>
            <button className="btn btn-info" onClick={history.goBack} >Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
