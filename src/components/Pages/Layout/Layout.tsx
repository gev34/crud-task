import { Outlet, NavLink } from "react-router-dom";
//REDUX
import { useDispatch } from "react-redux";
import { userPostsPageAction } from "../../../redux/slices/userPostsSlice";
//CSS
import "./layout.css";

export const Layout = () => {
  const dispatch = useDispatch()
  return (
    <>
      <div className="linkContainer">
        <div className="links">
          <div className="linkCard">
            <NavLink 
              className={({ isActive }) => `link ${isActive ? 'activeLink' : ''}`} 
              to="/new-ad"
              onClick={() => dispatch(userPostsPageAction(false))}
            >
              <p className="">Post an Ad</p>
            </NavLink>
          </div>
          <div className="linkCard">
            <NavLink 
              className={({ isActive }) => `link ${isActive ? 'activeLink' : ''}`} 
              to="/my-ads"
              onClick={() => dispatch(userPostsPageAction(true))}
            >
              <p className="">My Ads</p>
            </NavLink>
          </div>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};
