import { useState, useEffect } from "react"

function VehicleModelForm() {
    const [name, setName] = useState("")
    const [pictureUrl, setPicturelUrl] = useState("")
    const [manufacturers, setManufacturers] = useState([])
    const [manufacturer_id, setManufacturer] = useState("")

    const handleNameChange = (event) => {
        const name = event.target.value
        setName(name)
    }
    const handlePictureChange = (event) => {
        const picture_url = event.target.value
        setPicturelUrl(picture_url)
    }
    const handleManufacturerChange = (event) => {
        const manufacturer_id = event.target.value
        setManufacturer(manufacturer_id)
    }

    const fetchData = async () => {
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setManufacturers(data.manufacturers)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.manufacturer_id = manufacturer_id
        data.name = name
        data.picture_url = pictureUrl
        const vehicleUrl = "http://localhost:8100/api/models/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(vehicleUrl, fetchConfig)
        if (response.ok) {
            const newVehicle = await response.json()
            console.log(newVehicle)
            setManufacturer('')
            setName('')
            setPicturelUrl('')
        }
    }
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="create-vehicle-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureChange} value={pictureUrl} placeholder="pictureUrl" required type="text" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleManufacturerChange} value={manufacturer_id} required name="manufacturer" id="manufacturer" className="form-select">
                                <option value="">Choose a Manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default VehicleModelForm;