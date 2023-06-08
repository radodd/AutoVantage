import React, { useState, useEffect } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);
    const [vin, setVin] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('');
    const [technician, setTechnician] = useState('');

    const handleVinChange = (event) => {
        const value = event.target.value;
            setVin(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value;
            setCustomer(value);
    }
    const handleDateChange = (event) => {
        const value = event.target.value;
            setDate(value);
    }
    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }
    const handleReasonChange = (event) => {
        const value = event.target.value;
            setReason(value);
    }
    const handleStatusChange = (event) => {
        const value = event.target.value;
        setStatus(value);
    }
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }


    const formatDate = (dateObject, timeObject) => {
        console.log(dateObject);
        console.log(timeObject);
        const date = new Date(dateObject + ':' + timeObject);
        console.log(date);
        const isoDate = date.toISOString();
        console.log(isoDate);
        return isoDate;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.vin = vin;
        data.customer = customer;
        const formattedDate = formatDate(date, time);
        data.date_time = formattedDate;
        data.reason = reason;
        data.status = status;
        data.technician = technician;



        const postUrl = `http://localhost:8080/api/appointments/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(postUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment);

            setVin('');
            setCustomer('');
            setDate('');
            setTime('');
            setReason('');
            setStatus('');
            setTechnician('');
        }
    }

    const fetchData = async () => {
        const url = `http://localhost:8080/api/technicians/`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);




    return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new appointment</h1>
                <form onSubmit={handleSubmit} id="create-technician-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleVinChange} placeholder="Vehicle VIN" value={vin} required type="text" name="vin" id="vin" className="form-control" />
                        <label htmlFor="vin">Vehicle VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleCustomerChange} placeholder="Customer" value={customer} required type="text" name="customer" id="customer" className="form-control" />
                        <label htmlFor="customer">Customer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleDateChange} placeholder="Date" value={date} required type="date" name="date" id="date" className="form-control" />
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleTimeChange} placeholder="Date" value={time} required type="time" name="date" id="date" className="form-control" />
                        <label htmlFor="date">Time</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleReasonChange} placeholder="Reason" value={reason} required type="text" name="reason" id="reason" className="form-control" />
                        <label htmlFor="reason">Reason for appointment</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleStatusChange} placeholder="Status" value={status} required type="text" name="status" id="status" className="form-control" />
                        <label htmlFor="status">Status</label>
                    </div>
                    <div className="mb-3">
                    <select onChange={handleTechnicianChange} value={technician} required className="form-select" id="technician">
                        <option value="">Choose a technician</option>
                        {technicians.map(technician => {
                        return (
                            <option key={technician.id} value={technician.id}>{technician.first_name + ' ' + technician.last_name}</option>
                        )
                        })}
                    </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
     );
}
export default AppointmentForm;
