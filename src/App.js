import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import About from './About'
import Navbar from './components/Navbar'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route exact path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
