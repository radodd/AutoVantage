import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelList from './VehicleModelList';
import VehicleModelForm from './VehicleModelForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
