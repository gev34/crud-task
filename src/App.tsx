import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
//PAGES
import { Layout } from "./components/Pages/Layout/Layout";
import NewAd from "./components/Pages/NewAd/NewAd";
import MyAds from "./components/Pages/MyAds/MyAds";
//CSS
import "./App.scss";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/new-ad"); // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<NewAd />} />
          <Route path="/new-ad" element={<NewAd />} />
          <Route path="/my-ads" element={<MyAds />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
