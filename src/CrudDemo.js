import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PersonTable from './PersonTable';


const CrudDemo = () => {
    const [persons, setPersons] = useState([]);
    const baseUrl = process.env.REACT_APP_API_URL;

    let fetchDataFromDB= ()=>{
        axios.get(baseUrl).then((response)=>{
            if(response.status==200){
                setPersons(response.data)
            }
        })
    }

    useEffect(()=>{
        console.log('use Effect')
        fetchDataFromDB();
        
    },[])
    return (
        <div>
            <PersonTable fetchDataFromDB={fetchDataFromDB} persons={persons}></PersonTable>
        </div>
    );
};

export default CrudDemo;