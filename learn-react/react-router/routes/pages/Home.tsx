import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);
  return (
    <>
      <h1>Home Component</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
}
