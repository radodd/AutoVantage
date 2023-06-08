import { useState, useEffect } from 'react';

function CustomerList() {
    const [customers, setCustomers] = useState([])

    const fetchData = async () => {
        const url = "http://localhost:8090/api/customers/"
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customers)
            console.log(data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        <h1>List of Customers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody >
                    {customers.map((customer) => {
                        return (
                                <tr key={customer.id}>
                                    <td className="fs-3">{customer.first_name}</td>
                                    <td className="fs-3">{customer.last_name}</td>
                                    <td className="fs-3">{customer.phone_number}</td>
                                    <td className="fs-3">{customer.address}</td>
                                </tr>
                        )
                    })}
                </tbody>
            </table>
        </>)
}

export default CustomerList