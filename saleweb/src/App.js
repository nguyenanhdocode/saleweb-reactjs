import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './components/Home/Details';
import Header from './components/Commons/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/products/:productId' element={<Details></Details>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
