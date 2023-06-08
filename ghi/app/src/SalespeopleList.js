import { useState, useEffect } from "react";

function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([])

    const fetchData = async () => {
        const url = "http://localhost:8090/api/salespeople/"
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
            console.log(data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    // const handleDelete = async (event) => {
    //     const salespeopleUrl = `http://localhost:8090/api/salespeople/${event}/`
    //     const fetchConfig = {
    //         method: "DELETE",
    //     }
    //     const response = await fetch(salespeopleUrl, fetchConfig)
    //     if (response.ok) {
    //         console.log(response.deleted, response.breakdown)
    //         fetchData()
    //     }
    // }
    return (
        <>
        <h1>List of Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody >
                    {salespeople.map((salesperson) => {
                        return (
                                <tr key={salesperson.id}>
                                    <td className="fs-3">{salesperson.first_name}</td>
                                    <td className="fs-3">{salesperson.last_name}</td>
                                    <td className="fs-3">{salesperson.employee_id}</td>
                                    <td>
                                    {/* <button onClick={() => handleDelete(salesperson.employee_id)} className="btn btn-danger">Delete</button>  */}
                                    </td>
                                </tr>
                        )
                    })}
                </tbody>
            </table>
        </>)
}

export default SalespeopleList