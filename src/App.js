import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import Navigation from './components/navigation/navigation.component';
import Home from './components/home/home.component';
import About from './components/about/about.component';
import SpecificMovie from './components/specific-movie/specific-movie.component';
import Authentication from './components/authentication/authentication.component';

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route path='movies/:movieId' element={<SpecificMovie/>}></Route>
          <Route path='about' element={<About/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/auth' element={<Authentication/>} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
