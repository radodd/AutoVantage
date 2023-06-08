import { useState, useEffect } from 'react';

function SalesList() {
    const [sales, setSales] = useState([])
    
    const fetchData = async () => {
        const url = "http://localhost:8090/api/sales/"
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setSales(data.sales)
            console.log(data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return(
        <>
        <h1>List of Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Employee ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer Name</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody >
                    {sales.map((sale) => {
                        return (
                                <tr key={sale.id}>
                                    <td className="fs-3">{sale.salesperson.employee_id}</td>
                                    <td className="fs-3">{sale.salesperson.first_name + " " + sale.salesperson.last_name}</td>
                                    <td className="fs-3">{sale.customer.first_name + " " + sale.customer.last_name}</td>
                                    <td className="fs-3">{sale.automobile.vin}</td>
                                    <td className="fs-3">{sale.price}</td>
                                </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default SalesList