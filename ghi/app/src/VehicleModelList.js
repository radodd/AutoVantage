import { useState, useEffect } from "react"

function VehicleModelList() {
    const [models, setModels] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setModels(data.models)
        }
        else {
            console.error(response)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
return (
    <>
    <div className="col">
        {models && models.map((model) => {
            return (
                <div key={model.id} className="card mb-3 shadow">
                    <img src={model.picture_url} width="400" alt={model.name} className="card-img-top" />
                    <div className="card-body">
                        <label htmlFor="model_name">Model Name</label>
                        <h5 className="card-title">{model.name}</h5>
                        <label htmlFor="manufacturer">Manufacturer</label>
                        <h6 className="card-text text-muted">{model.manufacturer.name}</h6>
                    </div>
                </div>);
        })}
    </div>
    </>
)
}

export default VehicleModelList