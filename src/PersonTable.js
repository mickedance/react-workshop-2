import React from "react";
import PersonTableHeader from "./PersonTableHeader";
import PersonTableRow from "./PersonTableRow";

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
