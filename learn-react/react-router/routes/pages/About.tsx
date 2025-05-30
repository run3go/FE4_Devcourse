import { useLoaderData } from "react-router";

export default function About() {
  const posts = useLoaderData();
  return (
    <>
      <h1>About Component</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
}
