import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import '../css/def.lay.css'

export default function DefaultLayout(props){

    const {handleLogout}=useContext(AuthContext)

     return(
        <div>
            <div className="header bs1">
            <div className="header">
                <div className="logo">
                    <b>Agri-Tool Rentals</b>
                </div>
                <div className="nav-links">
                    <Link to="/home">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/user-bookings">My-Bookings</Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>


            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
     )


}