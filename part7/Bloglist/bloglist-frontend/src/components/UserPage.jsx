import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import userService from "../services/users"
import {
  Container, 
  Typography,
  List,
  ListItem } from "@mui/material";

const UserPage = () => {

    const { id } = useParams()
    const [userAndBlogs, setUserAndBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userData = await userService.getUserAndBlogsByUserId(id);
      
            if (userData) {
              const userDictionary = {
                [userData.username]: userData.blogs
              };
              setUserAndBlogs(userDictionary);
            } else {
              console.log("User data not found");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
      
        fetchData();
      }, []);
      
      return (
        <Container>
        {Object.keys(userAndBlogs).map((username) => (
          <div key={username}>
            <Typography variant="h4">{username}</Typography>
            <Typography variant="h5">added blogs</Typography>
            <List>
              {userAndBlogs[username].map((blog) => (
                <ListItem key={blog.id}>
                  <Typography variant="subtitle1">{blog.title}</Typography>
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </Container>
    )
}


export default UserPage