import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from "./store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import RootLayout from "./layout/RootLayout";
import PrivateRoute from "./components/PrivateRoute";
import NoteLayout from "./layout/NoteLayout";
import NoteUpdate from "./pages/NoteUpdate";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="notes" element={<NoteLayout />}>
            <Route index element={<Notes />} />
            <Route path="update" element={<NoteUpdate />} />
          </Route>
        </Route>
        <Route path='*' element={
          <Navigate to='/' replace/>
        }/>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
