import React, { useState } from 'react';

function SalespeopleForm() {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [employee_id, setEmployeeID] = useState("")

    const handleFirstNameChange = (event) => {
        const first_name = event.target.value
        setFirstName(first_name)
    }
    const handleLastNameChange = (event) => {
        const last_name = event.target.value
        setLastName(last_name)
    }
    const handleEmployeeIDChange = (event) => {
        const employee_id = event.target.value
        setEmployeeID(employee_id)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.first_name = first_name
        data.last_name = last_name
        data.employee_id = employee_id

        const submitUrl = "http://localhost:8090/api/salespeople/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(submitUrl, fetchConfig)
        if (response.ok) {
            const newSalesperson = await response.json()
            console.log(newSalesperson)

            setFirstName("")
            setLastName("")
            setEmployeeID("")
        }
    }
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} placeholder="firstName" value={first_name} required type="text" name="firstname" id="firstname" className="form-control" />
                            <label htmlFor="fabric">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} placeholder="lastName" value={last_name} required type="text" name="lastname" id="lastname" className="form-control" />
                            <label htmlFor="fabric">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEmployeeIDChange} placeholder="employeeID" value={employee_id} required type="text" name="employeeid" id="employeeid" className="form-control" />
                            <label htmlFor="fabric">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
         );
    }

export default SalespeopleForm