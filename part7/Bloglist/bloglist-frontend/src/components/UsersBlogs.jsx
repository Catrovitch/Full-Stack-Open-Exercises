import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import usersService from "../services/users";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  TableHead
} from '@mui/material'

const UsersBlogs = () => {
  const [usersAndBlogs, setUsersAndBlogs] = useState([]);

  useEffect(() => {
    // Fetch user data and their number of blogs from the service
    const fetchData = async () => {
      try {
        const allUsers = await usersService.getUsersWithNumberOfBlogs();

        // Transform the data to include both username and number of blogs
        const userData = allUsers.map((user) => ({
          id: user.id,
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
    <Container>
      <Typography variant="h3">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Number of blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersAndBlogs.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>{user.numberOfBlogs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersBlogs;
