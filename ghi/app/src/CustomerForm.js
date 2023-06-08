import React, { useState } from 'react';

function CustomerForm() {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    const handleFirstNameChange = (event) => {
        const first_name = event.target.value
        setFirstName(first_name)
    }
    const handleLastNameChange = (event) => {
        const last_name = event.target.value
        setLastName(last_name)
    }
    const handlePhoneNumberChange = (event) => {
        const phone_number = event.target.value
        setPhoneNumber(phone_number)
    }
    const handleAddressChange = (event) => {
        const address = event.target.value
        setAddress(address)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.first_name = first_name
        data.last_name = last_name
        data.phone_number = phone_number
        data.address = address

        const submitUrl = "http://localhost:8090/api/customers/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(submitUrl, fetchConfig)
        if (response.ok) {
            const newCustomer = await response.json()
            console.log(newCustomer)

            setFirstName("")
            setLastName("")
            setPhoneNumber("")
            setAddress("")
        }
    }
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new Customer</h1>
                    <form onSubmit={handleSubmit} id="create-customer-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} placeholder="firstName" value={first_name} required type="text" name="firstname" id="firstname" className="form-control" />
                            <label htmlFor="fabric">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} placeholder="lastName" value={last_name} required type="text" name="lastname" id="lastname" className="form-control" />
                            <label htmlFor="fabric">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePhoneNumberChange} placeholder="phoneNumber" value={phone_number} required type="text" name="phonenumber" id="phonenumber" className="form-control" />
                            <label htmlFor="fabric">Phone Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleAddressChange} placeholder="address" value={address} required type="text" name="address" id="address" className="form-control" />
                            <label htmlFor="fabric">Address</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
         );
    }

export default CustomerForm
