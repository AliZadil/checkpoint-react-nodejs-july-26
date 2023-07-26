import React, { useEffect, useState } from "react";
import "./App.css";

interface Post {
  id: number;
  text: string;
}

function App() {
  const [ posts, setPosts ] = useState<Post>([]);
  const [ input, setInput ] = useState<string>("");
  const [ ascending, setAscending ] = useState<boolean>(true);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:3001/api/posts/", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPosts(data);
  };
  
  const handleSavePost = async () => {
    const response = await fetch("http://localhost:3001/api/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    });
    const newPost = await response.json();
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setInput("");
  };

  const handleUpdatePost = async (id:number) => {
    const postToUpdate = posts.find(post => post.id === id)
    const response = await fetch("http://localhost:3001/api/posts/${id}", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: postToUpdate.text }),
    });
    fetchPosts();
  }

  const handleDeletePost = async (id:number) => {
    await fetch("http://localhost:3001/api/posts/${id}", {
      method: "DELETE",
      mode: "cors",
    });
    fetchPosts();
  }

  const handleSort = () => {
    const sortedPosts: Post[] = [...posts].sort((a,b) => ascending ? a.id - b.id : b.id - a.id);
    setPosts(sortedPosts);
    setAscending(!ascending);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <input value={input} onChange={element => setInput(element.target.value)} />
      <button onClick={handleSavePost}>Save Post</button>
      <button onClick={handleSort}>{ascending ? "Sort Decending" : "Sort Ascending"}</button>
      {posts.map((post: Post) => (
        <div key={post.id}>
          <input 
            value={post.text} 
            onChange={(element) => setPosts(posts.map(p => p.id === post.id ? {...p, text: element.target.value } : p))} 
            style={{color: post.id ½ 2 === 0 ? "red" : "blue"}}
          />
          <button onClick={() => handleUpdatePost(post.id)} >Update</button>
          <button onClick={() => handleDeletePost(post.id)} >Delete</button>
        </div>
      ))}
    </div>
  )
}

export default App;
