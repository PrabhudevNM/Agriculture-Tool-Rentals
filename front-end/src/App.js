import "./css/App.css"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom'
import Login from "./pages/login"
import Home from "./pages/Home"
import { useContext } from "react"
import AuthContext from "./context/AuthContext"
import Register from "./pages/Register"
import PrivateRoute from "./components/PrivateRoute"
import AuthorizeRoute from "./components/AuthorizeRoute"
import Forbidden from "./pages/Forbidden"
import Profile from "./pages/Profile"
import Booking from "./pages/BookingProduct"
import ContactPage from "./pages/Contact"
import AboutUsPage from "./pages/About"
import UserProfile from "./pages/Profile"
import UserBookings from './pages/UserBooking'
import AdminDashboardDs from "./components/admin-dashbord"
import ManageBookings from "./pages/admin-panel/manage-bookings"
import ManageProducts from "./pages/admin-panel/manage-products"
import ManageUsers from "./pages/admin-panel/manage-users"
import Success from "./pages/success"
import Cancel from "./pages/cancel"

export default function App(){
    
    const {state}=useContext(AuthContext)
    
    return(
        <div className='App'>
                    {state.isLoggedIn ?(
                    <>
                    {/* <li><Link to='/home'>Home</Link></li> */}
                    {/* <li><Link to="/profile">Profile</Link></li> */}

                    {(state.user.role==="admin" || state.user.role==="moderator")&& 
                    <AdminDashboardDs />
                    }
                    
                    {/* <li><Link to='/my-products'>My Products</Link></li> */}

                    {/* <li><button onClick={handleLogout}>Logout</button></li> */}
                    </>
                    ):(
                        <>
                        {/* <li><Link to="/register">Register</Link></li> */}
                        {/* <li><Link to="/login">Login</Link></li> */}
                      </>
                    )}

            <Routes>
                <Route path='/' element={<Register/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                    
                <Route path='/home' element={
                    <PrivateRoute>
                    <Home/>
                    </PrivateRoute>}></Route>
                    
                <Route path="/profile" element={
                    <PrivateRoute>
                     <Profile />
                    </PrivateRoute>
                    }></Route>    

                     <Route path='/booking/:id' element={
                        <PrivateRoute>
                        <Booking/>
                        </PrivateRoute>
                    }/>
                     <Route path="/contact" element={
                        <PrivateRoute>
                            <ContactPage/>
                            </PrivateRoute>
                        }></Route>

                     <Route path="/about" element={
                        <PrivateRoute>
                            <AboutUsPage/>
                            </PrivateRoute>
                    }></Route>
                    
                     <Route path="/profile" element={
                        <PrivateRoute>
                            <UserProfile/>
                        </PrivateRoute>
                    }>
                     </Route>

                     <Route path="/user-bookings" element={
                        <PrivateRoute>
                        <UserBookings />
                        </PrivateRoute>
                    } />
                     <Route path="/success" element={
                        <PrivateRoute>
                        <Success />
                        </PrivateRoute>
                    } />
                     <Route path="/cancel" element={
                        <PrivateRoute>
                        <Cancel />
                        </PrivateRoute>
                    } />


                        {/* admin panel*/}
                      <Route path='/manage-users' element={
                     <PrivateRoute>
                     <AuthorizeRoute permittedRoles={['admin','moderator']}>
                     <ManageUsers />
                     </AuthorizeRoute>
                     </PrivateRoute>
                     }></Route>

                     <Route path='/manage-products' element={
                     <PrivateRoute>
                     <AuthorizeRoute permittedRoles={['admin','moderator']}>
                     <ManageProducts />
                     </AuthorizeRoute>
                     </PrivateRoute>
                     }></Route>
                     
                     <Route path="/manage-bookings" element={
                        <PrivateRoute>
                        <AuthorizeRoute permittedRoles={['admin','moderator']}>
                        <ManageBookings/>
                        </AuthorizeRoute>
                     </PrivateRoute>
                        }></Route>

                <Route path='/forbidden' element={<Forbidden/>}/> 

            </Routes>
            <ToastContainer/>
        </div>
    )
    
}