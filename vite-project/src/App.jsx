import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import About from './pages/About'
import Dashboard from './pages/Dashboard';
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import Projects from "./pages/Projects"
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from "./components/ScrollToTop"
import Search from "./pages/Search"
// import './App.css'
import UpdatePost from './pages/UpdatePost';

function App() {

  return (
    <BrowserRouter>
     <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        
        <Route path='/search' element={<Search />} />
        <Route path='/projects' element={<Projects />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/post/:postSlug' element={<PostPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
