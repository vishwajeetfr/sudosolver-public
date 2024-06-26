import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <Outlet />
    </div>
  );
}

export default Home;
