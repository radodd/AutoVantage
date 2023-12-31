import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-xlg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 row">
            <div className="col-lg-6">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="manufacturers">Manufacturers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="manufacturer/new">Create a Manufacturer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/vehicles">Vehicles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/vehicles/new">New Vehicle Model</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="automobiles">Automobiles</NavLink>
              </li>
            </div>
            <div className="col-lg-6">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="automobile/new">Create a Automobile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/salespeople">Salespeople</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/salespeople/new">Create a Salesperson</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/customers">Customers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/customers/new">Create a Customer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/sales">Sales</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/sales/new">Record a Sale</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/sales/history">Salesperson History</NavLink>
              </li>
              <li>
                <NavLink className="nav-link active" aria-current="page" to="technicians">Technicians</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="technician/new">Create a Technician</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="appointments">Appointments</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="appointment/new">Create an appointment</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="servicehistory">Service History</NavLink>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
