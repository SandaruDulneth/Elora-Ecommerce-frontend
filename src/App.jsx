import './App.css'
import HomePage from "./Pages/home.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from "./Pages/login.jsx";
import {Toaster} from "react-hot-toast";
import AdminPage from "./Pages/Admin/adminPage.jsx";
import TestPage from "./Pages/test.jsx";
import RegisterPage from "./Pages/register.jsx";
import {ScrollTrigger,SplitText} from "gsap/all";
import {GoogleOAuthProvider} from "@react-oauth/google";

    function App() {
        return (
            <GoogleOAuthProvider clientId="910626366800-3sje4q2ppolcin3cck7n75q7lhndsmcf.apps.googleusercontent.com">
                <BrowserRouter>
                    <div >
                        <Toaster position="top-right"></Toaster>
                        {/* <Header/> */}
                        <Routes path="/*">
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/testing" element={<TestPage/>}/>
                            <Route path="/signup" element={<RegisterPage/>}/>
                            <Route path='/admin/*' element={<AdminPage/>}/>
                            <Route path='/*' element={<HomePage/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </GoogleOAuthProvider>
        )
    }
    export default App