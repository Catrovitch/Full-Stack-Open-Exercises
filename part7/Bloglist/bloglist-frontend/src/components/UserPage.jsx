import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import userService from "../services/users"

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
        <div>
            {Object.keys(userAndBlogs).map(username => (
                <div key={username}>
                    <h2>{username}</h2>
                    <h3>added blogs</h3>
                    <ul>
                        {userAndBlogs[username].map(blog => (
                            <li key={blog.id}>{blog.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}


export default UserPage