import { useEffect, useState } from 'react';

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);

    const fetchData = async () => {
      const url = 'http://localhost:8100/api/manufacturers'
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
        console.log(data);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);

    const handleDelete = async (event) => {
      const manufacturerUrl = `http://localhost:8100/api/manufacturers/${event}/`
      const fetchConfig = {
        method: "delete",
      }
      const response = await fetch(manufacturerUrl, fetchConfig);
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
              <th>Name</th>
            </tr>
          </thead>
          <tbody >
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td className="fs-3">{ manufacturer.name }</td>
                  <button onClick={() => handleDelete(manufacturer.id)} className="btn btn-danger">Delete</button>
              </tr>
            )
          })}
          </tbody>
        </table>
      </>
    );
  }

  export default ManufacturerList;
