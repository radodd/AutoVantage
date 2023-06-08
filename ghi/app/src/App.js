import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import SalespeopleList from './SalespeopleList';
import SalespeopleForm from './SalespeopleForm';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import SalesList from './SalesList';
import SalesForm from './SalesForm';
import SalespersonHistory from './SalespersonHistory';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import ServiceHistoryList from './ServiceHistoryList';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/vehicles" element={<VehicleModelList models={props.models} />} />
          <Route path="/vehicles/new" element={<VehicleModelForm />} />
          <Route path="manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />}></Route>
          <Route path="manufacturer/new" element={<ManufacturerForm />}></Route>
          <Route path="automobiles" element={<AutomobileList automobiles={props.automobiles} />}></Route>
          <Route path="automobile/new" element={<AutomobileForm />}></Route>
          <Route path="/salespeople" element={<SalespeopleList salespeople={props.salespeople} />}></Route>
          <Route path="/salespeople/new" element={<SalespeopleForm />} />
          <Route path="/customers" element={<CustomerList customers={props.customers} />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/sales" element={<SalesList sales={props.sales} />} />
          <Route path="/sales/new" element={<SalesForm />} />
          <Route path="/sales/history" element={<SalespersonHistory />} />
          <Route path="technicians" element={<TechnicianList technicians={props.technicians} />}></Route>
          <Route path="technician/new" element={<TechnicianForm />}></Route>
          <Route path="appointments" element={<AppointmentList appointments={props.appointments} />}></Route>
          <Route path="appointment/new" element={<AppointmentForm />}></Route>
          <Route path="servicehistory" element={<ServiceHistoryList services={props.services} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
