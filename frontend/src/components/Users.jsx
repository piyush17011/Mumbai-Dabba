import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserOrders, setSelectedUserOrders] = useState([]);  // This will now hold meals data for kitchens
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get the logged-in user's data from localStorage or any other storage
    const userDetail = localStorage.getItem("user");
    const user = JSON.parse(userDetail);
    setCurrentUser(user);

    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/allusers");

        // Filter out admins and sort users based on role (kitchen users first)
        const filteredUsers = response.data.filter(user => user.role !== "admin");

        const sortedUsers = filteredUsers.sort((a, b) => {
          if (a.role === "kitchen" && b.role !== "kitchen") return -1;
          if (a.role !== "kitchen" && b.role === "kitchen") return 1;
          return 0; // No sorting needed if both users are of the same role
        });

        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleViewOrders = async (userId) => {
    try {
      if (selectedUserId === userId) {
        // If same user is clicked again, toggle off the orders view
        setSelectedUserId(null);
        setSelectedUserOrders([]);
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/orders/userorder/${userId}`);
      setSelectedUserOrders(response.data);
      setSelectedUserId(userId);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const handleViewMeals = async (userId) => {
    console.log("View Meals clicked for userId:", userId);

    try {
      if (selectedUserId === userId) {
        // If same user is clicked again, toggle off the meals view
        setSelectedUserId(null);
        setSelectedUserOrders([]);  // Reset meals list
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/meals/getkmeals/${userId}`);

      // Log the response to see its structure
      console.log("Meals data response:", response.data);

      if (Array.isArray(response.data)) {
        setSelectedUserOrders(response.data);  // Set meals data correctly
        setSelectedUserId(userId);
      } else {
        console.error("Expected an array but got:", response.data);
        setSelectedUserOrders([]);  // Reset if data is not an array
      }
    } catch (error) {
      console.error("Error fetching user meals:", error);
      setSelectedUserOrders([]);  // Reset in case of an error
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user and their orders?");
      if (confirmDelete) {
        const response = await axios.delete(`http://localhost:5000/api/users/deleteuser/${userId}`);

        if (response.data.success) {
          alert("User and their orders deleted successfully.");
          setUsers(users.filter(user => user._id !== userId)); // Remove user from state
        } else {
          alert("Failed to delete user and their orders.");
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user and their orders. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="users-heading">All Users</h2>
      
      {/* Kitchen Users Section */}
      <h3>Kitchens</h3>
      <div className="users-container">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users
            .filter((user) => user.role === "kitchen") // Only show kitchen users here
            .map((user) => (
              <div className="user-card" key={user._id}>
                <h3>{user.username}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                <p><strong>Address:</strong> {user.address || "N/A"}</p>

                {/* Display 'Current User' label if this is the logged-in user */}
                {/* {currentUser && currentUser.data._id === user._id && (
                  <span className="current-user-label">Current User</span>
                )} */}

                {/* Show the "View Meals" button for kitchen users */}
                {currentUser && currentUser.data._id !== user._id && (
                  <button
                    className="view-orders-btn"
                    onClick={() => handleViewMeals(user._id)}
                  >
                    {selectedUserId === user._id ? "Hide Meals" : "View Meals"}
                  </button>
                )}

                {/* Display Meals for the Selected User */}
                {selectedUserId === user._id && user.role === "kitchen" && (
                  <div className="user-orders">
                    <h4>User Meals</h4>
                    {selectedUserOrders.length === 0 ? (
                      <p>No meals available for this user.</p>
                    ) : (
                      selectedUserOrders.map((meal) => (
                        <div key={meal._id} className="meal-card">
                          <p><strong>Meal:</strong> {meal.name || "N/A"}</p>
                          <p><strong>Price:</strong> ₹{meal.price}</p>
                          <p><strong>Description:</strong> {meal.description || "N/A"}</p>
                          <hr />
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
        )}
      </div>

      {/* Regular Users Section */}
      <h3>Users</h3>
      <div className="users-container">
        {users
          .filter((user) => user.role !== "kitchen") // Only show regular users here
          .map((user) => (
            <div className="user-card" key={user._id}>
              <h3>{user.username}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
              <p><strong>Address:</strong> {user.address || "N/A"}</p>

              {/* Display 'Current User' label if this is the logged-in user */}
              {currentUser && currentUser.data._id === user._id && (
                <span className="current-user-label">Current User</span>
              )}

              {/* Show the "View Orders" button for regular users */}
              {currentUser && currentUser.data._id !== user._id && (
                <button
                  className="view-orders-btn"
                  onClick={() => handleViewOrders(user._id)}
                >
                  {selectedUserId === user._id ? "Hide Orders" : "View Orders"}
                </button>
              )}

              {/* Display Orders for the Selected User */}
              {selectedUserId === user._id && user.role !== "kitchen" && (
                <div className="user-orders">
                  <h4>User Orders</h4>
                  {selectedUserOrders.length === 0 ? (
                    <p>No orders found for this user.</p>
                  ) : (
                    selectedUserOrders.map((order) => (
                      <div key={order._id} className="order-card">
                        <p><strong>Meal:</strong> {order.orderItems[0]?.meal || "N/A"}</p>
                        <p><strong>Amount:</strong> ₹{order.amount}</p>
                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        <hr />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
