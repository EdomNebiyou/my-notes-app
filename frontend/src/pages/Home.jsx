import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
    return (
      <div className="text-center py-10">
        <h1 className="text-4xl font-semibold">Welcome to the Note App</h1>
        {
          user
          ? <>
          <p className="text-2xl font-mono m-4">name: {user.name}</p>
          <p className="text-2xl font-mono m-4">email: {user.email}</p>
          </>
          :null
        }
      </div>
    );
  };
  
  export default Home;
  