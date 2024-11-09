
import axios from "../../config/axios"
import { useState, useEffect, useContext } from "react";
import { Table, Select, Button, message, Popconfirm } from "antd";
import AuthContext from "../../context/AuthContext";

const { Option } = Select;

export default function ManageUsers() {
  const { state } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/admin-lsitUsers", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setUsers(response.data);
      } catch (error) {
        message.error("Failed to load users");
        console.log(error);
      }
    })();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      const response = await axios.put(
        `/api/users/admin-change-role/${userId}`,
        { role: role },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const updatedUsers = users.map((user) =>
        user._id === response.data._id ? response.data : user
      );
      setUsers(updatedUsers);
      message.success("User role updated successfully");
    } catch (error) {
      message.error("Failed to update user role");
      console.log(error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await axios.delete(`/api/admin-deleteUsers/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      message.success("User removed successfully");
    } catch (error) {
      message.error("Failed to remove user");
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, user) =>
        state.user.role === "admin" && state.user._id !== user._id ? (
          <Select
            value={role}
            onChange={(newRole) => handleRoleChange(user._id, newRole)}
            style={{ width: 120 }}
          >
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        ) : (
          role
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, user) =>
        state.user.role === "admin" && state.user._id !== user._id ? (
          <Popconfirm
            title="Are you sure to remove this user?"
            onConfirm={() => handleRemoveUser(user._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div style={{ padding: '24px' }}y>
      <h2>List of Users - {users.length}</h2>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
