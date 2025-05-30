import { createBrowserRouter, RouterProvider } from "react-router";
import Default from "./layouts/Default";
import { fetchJsonPostDetail, fetchJsonPosts } from "./loader/posts.loader";
import About from "./pages/About";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <Default />,
    hydrateFallbackElement: <h1>Loading...</h1>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/custom-about",
        children: [
          {
            path: "about",
            loader: fetchJsonPosts, //GET
            errorElement: <h1>Error</h1>,
            element: <About />,
          },
        ],
      },
      {
        path: "/detail/:id",
        loader: fetchJsonPostDetail,
        element: <Detail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
