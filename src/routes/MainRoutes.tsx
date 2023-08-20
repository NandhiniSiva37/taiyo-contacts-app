import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "../components/NotFound";
import Contacts from "../components/contacts/Contact";
import MainLayout from "../layout/MainLayout";
import Charts from "../components/charts/Charts";

function MainRoutes() {
  const navigate = useNavigate();

  //to push contacts screen on initial load
  useEffect(() => {
    navigate("/contacts");
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Contacts />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/charts" element={<Charts />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default MainRoutes;
