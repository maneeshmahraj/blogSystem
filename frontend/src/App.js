
import { BrowserRouter,Routes,Route} from 'react-router-dom'

import Layout from './Layout';



import Home from './components/Home';
import Blogcart from './components/BlogCart';
import BlogView from './components/BlogView';
import Footer from './components/Footer';
import Ragister from './components/Ragister';
import Login from './components/Login';
import Views from './components/Views';



const App=()=> {
  
  return (
   <>
<BrowserRouter>
<Routes>
    <Route path='/' element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path='home' element={<Home/>}/>
       <Route path='cart' element={<Blogcart/>}/>
       <Route path='blogview/:id' element={<BlogView/>}/>
       <Route path='ragister' element={<Ragister/>}/>
       <Route path='login' element={<Login/>}/>
       <Route path='view/:id' element={<Views/>}/>
    </Route>
</Routes>
</BrowserRouter>
<Footer/>
  </>
  );
}

export default App;
