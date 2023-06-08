import { useState, useEffect } from 'react';

function SalespersonHistory() {
    const [sales, setSales] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [salesperson, setSalesperson] = useState("")

    const fetchData = async () => {
        const salespeopleUrl = "http://localhost:8090/api/salespeople/"
        const salesUrl = "http://localhost:8090/api/sales/"
        const salesResponse = await fetch(salesUrl)
        const salespeopleResponse = await fetch(salespeopleUrl)

        if (salesResponse.ok) {
            const salesData = await salesResponse.json()
            setSales(salesData.sales)
        }

        if (salespeopleResponse.ok) {
            const salespeopleData = await salespeopleResponse.json()
            setSalespeople(salespeopleData.salespeople)
        }

    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSalespersonChange = (event) => {
        const salesperson = event.target.value
        let updatedSales
        if (salesperson === "all") {
            updatedSales = sales
        }
        else {
            updatedSales = sales.filter((sale) => sale.salesperson.id === parseInt(salesperson))
        }
        setSales(updatedSales)
        setSalesperson(salesperson)
    }

    return(
        <>
        <h1>Salesperson History</h1>
            <div className="mb-3">
                        <select onChange={handleSalespersonChange} value={salesperson} required name="salesperson" id="salesperson" className="form-select">
                            <option value={"all"} key={"all"}>Choose a Salesperson</option>
                            {salespeople && salespeople.map(salesperson => {
                                return (
                                    <option key={salesperson.id} value={salesperson.id}>
                                        {salesperson.first_name + " " + salesperson.last_name}
                                    </option>
                                );
                            })}
                        </select>
                </div>
            <table className="table table-striped">
                <thead>
                    <tr>
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

export default SalespersonHistory