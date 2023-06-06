import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './Manufacturer';
import ManufacturerForm from './ManufacturerForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />}></Route>
          <Route path="manufacturer/new" element={<ManufacturerForm />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
