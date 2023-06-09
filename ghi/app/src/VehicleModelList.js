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

    const handleDelete = async (event) => {
        const automobilesUrl = `http://localhost:8100/api/models/${event}/`
        const fetchConfig = {
          method: "delete",
        }
        const response = await fetch(automobilesUrl, fetchConfig);
        if (response.ok) {
          console.log(response.deleted, response.breakdown)
          fetchData();
        }
      }
return (
    <>
    <div className="row">
        {models && models.map((model) => {
            return (
                <div key={model.id} className="col card mb-3 shadow" style={{ width: "250px" }}>
                    <img src={model.picture_url} style={{ width: "250px", height: "200px" }} alt={model.name} className="card-img-top" />
                    <div className="card-body">
                        <label htmlFor="model_name">Model Name</label>
                        <h5 className="card-title">{model.name}</h5>
                        <label htmlFor="manufacturer">Manufacturer</label>
                        <h6 className="card-text text-muted">{model.manufacturer.name}</h6>
                        <button onClick={() => handleDelete(model.id)} className="btn btn-danger">Delete</button>

                    </div>
                </div>);
        })}
    </div>
    </>
)
}

export default VehicleModelList
