import { useState, useEffect } from "react"

function SalesForm() {
    const [automobiles, setAutomobiles] = useState([])
    const [automobile, setAutomobile] = useState("")
    const [salespeople, setSalespeople] = useState([])
    const [salesperson, setSalesperson] = useState("")
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState("")
    const [price, setPrice] = useState("")

    const handleAutomobileChange = (event) => {
        const automobile = event.target.value
        setAutomobile(automobile)
    }
    const handleSalespersonChange = (event) => {
        const salesperson = event.target.value
        setSalesperson(salesperson)
    }
    const handleCustomerChange = (event) => {
        const customer = event.target.value
        setCustomer(customer)
    }
    const handlePriceChange = (event) => {
        const price = event.target.value
        setPrice(price)
    }
    const handleSaleChange = async (auto) => {
        const url = `http://localhost:8100/api/automobiles/${auto}/`
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify({"sold": true}),
            headers: { "Content-Type": "application/json"}
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            console.log("Sale Status of Automobile Updated to Sold")
        }
        else {
            console.error("Sale Status Update Failed")
        }
    }

    const fetchData = async () => {
        const automobilesUrl = "http://localhost:8100/api/automobiles/"
        const salespeopleUrl = "http://localhost:8090/api/salespeople/"
        const customersUrl = "http://localhost:8090/api/customers/"

        const automobileResponse = await fetch(automobilesUrl)
        if (automobileResponse.ok) {
            const data = await automobileResponse.json()
            const autosAvailable = data.autos.filter(auto => !auto.sold)
            setAutomobiles(autosAvailable)
        }
        const salespeopleResponse = await fetch(salespeopleUrl)
        if (salespeopleResponse.ok) {
            const data = await salespeopleResponse.json()
            setSalespeople(data.salespeople)
        }
        const customerResponse = await fetch(customersUrl)
        if (customerResponse.ok) {
            const data = await customerResponse.json()
            setCustomers(data.customers)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.automobile = automobile
        data.salesperson = salesperson
        data.customer = customer
        data.price = price
        
        const salesUrl = "http://localhost:8090/api/sales/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(salesUrl, fetchConfig)
        if (response.ok) {
            const newSale = await response.json()
            console.log(newSale)
            await handleSaleChange(automobile)
            fetchData()
            setAutomobile('')
            setSalesperson('')
            setCustomer('')
            setPrice('')
        }
    }
    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Record a Sale</h1>
                <form onSubmit={handleSubmit} id="create-sale-form">
                    <div className="mb-3">
                        <select onChange={handleAutomobileChange} value={automobile} required name="automobile" id="automobile" className="form-select">
                            <option value="">Choose an Automobile</option>
                            {automobiles && automobiles.map(automobile => {
                                return (
                                    <option key={automobile.id} value={automobile.vin}>
                                        {automobile.vin}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleSalespersonChange} value={salesperson} required name="salesperson" id="salesperson" className="form-select">
                            <option value="">Choose a Salesperson</option>
                            {salespeople && salespeople.map(salesperson => {
                                return (
                                    <option key={salesperson.id} value={salesperson.id}>
                                        {salesperson.first_name + " " + salesperson.last_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleCustomerChange} value={customer} required name="customer" id="customer" className="form-select">
                            <option value="">Choose a registered Customer</option>
                            {customers && customers.map(customer => {
                                return (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.first_name + " " + customer.last_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                            <input onChange={handlePriceChange} value={price} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                            <label htmlFor="name">Price</label>
                        </div>
                    <button className="btn btn-primary">Record a Sale</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default SalesForm