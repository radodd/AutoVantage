import { useEffect, useState } from 'react';

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);

    const fetchData = async () => {
      const url = 'http://localhost:8100/api/automobiles'
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos);
        console.log(data);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);

    const handleDelete = async (event) => {
      const automobilesUrl = `http://localhost:8100/api/automobiles/${event}/`
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Sold</th>

            </tr>
          </thead>
          <tbody>
          {automobiles.map((automobile) => {
            return (
              <tr key={automobile.id}>
                <td className="fs-3">{ automobile.vin }</td>
                <td className="fs-3">{ automobile.color }</td>
                <td className="fs-3">{ automobile.year }</td>
                <td className="fs-3">{ automobile.model.name }</td>
                <td className="fs-3">{ automobile.model.manufacturer.name }</td>
                <td className="fs-3">{ automobile.sold ? 'Sold' : 'Available' }</td>


                <td>
                  <button onClick={() => handleDelete(automobile.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </>
    );
  }

  export default AutomobileList;
