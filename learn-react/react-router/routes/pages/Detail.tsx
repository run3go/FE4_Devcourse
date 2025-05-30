import { useLoaderData, useParams } from "react-router";

export default function Detail() {
  const params = useParams();
  const data = useLoaderData();
  return (
    <>
      <h1>Detail Component : {params.id} </h1>
      <pre>{JSON.stringify(data.post, null, 2)}</pre>
      <pre>{JSON.stringify(data.user, null, 2)}</pre>
    </>
  );
}
