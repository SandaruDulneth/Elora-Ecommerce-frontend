import './App.css'
import HomePage from "./Pages/home.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from "./Pages/login.jsx";
import {Toaster} from "react-hot-toast";
import AdminPage from "./Pages/Admin/adminPage.jsx";
import TestPage from "./Pages/test.jsx";
import RegisterPage from "./Pages/register.jsx";

    function App() {
        return (
                <>
                    <BrowserRouter>
                        <div >
                            <Toaster position="top-right"></Toaster>
                            {/* <Header/> */}
                            <Routes path="/*">
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/admin" element={<AdminPage/>}/>
                                <Route path="/testing" element={<TestPage/>}/>
                                <Route path="/signup" element={<RegisterPage/>}/>
                                <Route path='/*' element={<h1>404 Not Found</h1>}/>
                            </Routes>
                        </div>
                    </BrowserRouter>
                </>
        )
    }
    export default App