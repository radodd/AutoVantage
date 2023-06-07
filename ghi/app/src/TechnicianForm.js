import React, { useState, useEffect } from 'react';

function TechnicianForm() {
    const [employeeID, setEmployeeID] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleEmployeeIDChange = (event) => {
        const value = event.target.value;
            setEmployeeID(value);
    }
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
            setFirstName(value);
    }
    const handleLastNameChange = (event) => {
        const value = event.target.value;
            setLastName(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.employee_id = employeeID;
        data.first_name = firstName;
        data.last_name = lastName;


        const postUrl = `http://localhost:8080/api/technicians/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(postUrl, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();
            console.log(newAutomobile);

            setEmployeeID('');
            setFirstName('');
            setLastName('');
        }
    }

    // const fetchData = async () => {
    //     const url = `http://localhost:8080/api/models/`;
    //     const response = await fetch(url);
    //     if (response.ok) {
    //         const data = await response.json();
    //         setModels(data.models);
    //     }
    // }
    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new technician</h1>
                <form onSubmit={handleSubmit} id="create-automobile-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleEmployeeIDChange} placeholder="Employee ID" value={employeeID} required type="number" name="employeeID" id="employeeID" className="form-control" />
                        <label htmlFor="employeeID">Employee ID</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFirstNameChange} placeholder="First Name" value={firstName} required type="text" name="firstName" id="firstName" className="form-control" />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} placeholder="Last Name" value={lastName} required type="text" name="lastName" id="lastName" className="form-control" />
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
     );
}
export default TechnicianForm;
