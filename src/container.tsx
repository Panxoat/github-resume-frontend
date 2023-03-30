import { Outlet } from "react-router-dom";

export const Container = () => {
  return (
    <div className="w-screen h-screen bg-dark-200">
      <Outlet />
    </div>
  );
};
