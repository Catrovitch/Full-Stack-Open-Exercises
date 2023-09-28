import React, { useEffect, useState } from "react";
import usersService from "../services/users";

const UsersBlogs = () => {
  const [usersAndBlogs, setUsersAndBlogs] = useState([]);

  useEffect(() => {
    // Fetch user data and their number of blogs from the service
    const fetchData = async () => {
      try {
        const allUsers = await usersService.getUsersWithNumberOfBlogs();

        // Transform the data to include both username and number of blogs
        const userData = allUsers.map((user) => ({
          username: user.username,
          numberOfBlogs: user.blogs.length,
        }));

        setUsersAndBlogs(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {usersAndBlogs.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.numberOfBlogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersBlogs;
