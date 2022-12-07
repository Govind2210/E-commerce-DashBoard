import './App.css';
import NavBar from './Components/NavBar';
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProducts from './Components/AddProducts';
import ProductList from './Components/ProductList';
import UpdateComponent from './Components/UpdateComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>

          {/* used rapper to make everything private until it login or signup */}
          <Route element={<PrivateComponent/>}>  
            <Route path='/' element={<ProductList/>}/>
            <Route path='/add' element={<AddProducts/>}/>
            <Route path='/update/:id' element={<UpdateComponent/>}/>
            <Route path='/logout' element={<h1>Logout Components</h1>}/>
            {/* <Route path='/Profil' element={<h1>profil Components</h1>}/> */}
          </Route>
          
          {/* this is not private  */}
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
