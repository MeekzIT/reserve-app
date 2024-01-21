import Navbar from "./navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { isAuthPages, notAuthPages } from "../../routing/routes";
import { useSelector } from "react-redux";

import "./layout.css";

export default function MainLayout() {
  const auth = useSelector((state) => state.auth.isAuth);

  return (
    <div className="home">
      <Navbar />
      <Routes>
        {auth
          ? isAuthPages.map((i) => {
              return <Route path={i.path} element={i.Component} key={i.id} />;
            })
          : notAuthPages.map((i) => {
              return (
                <Route path={i.path} element={<i.Component />} key={i.id} />
              );
            })}
      </Routes>
    </div>
  );
}
