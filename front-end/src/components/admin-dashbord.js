import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Row } from "antd";


export default function AdminDashboardDs(props) {
    const { handleLogout } = useContext(AuthContext);

    return (
        <div>
            <Row justify="space-between"  className="header bs1 shadow">
                <h3>Agri-Tool Rentals ||</h3>
                    <Link to="/manage-users">Manage-Users</Link>
                    <Link to="/manage-products">Manage-Products</Link>
                    <Link to="/manage-bookings">Manage-Bookings</Link>
                    <button onClick={handleLogout}>LogOut</button>
            </Row>
            <div>
                {props.children}
            </div>
        </div>
    );
}

