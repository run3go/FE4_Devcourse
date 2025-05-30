import type { LoaderFunctionArgs } from "react-router";

export const fetchJsonPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = response.json();
  return data;
};

export const fetchJsonPostDetail = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("lang");
  console.log(query);
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + params.id
  );
  const data = await response.json();

  const response2 = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + data.userId
  );
  const userData = await response2.json();
  return { post: data, user: userData };
};
