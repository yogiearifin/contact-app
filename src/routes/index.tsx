import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage";
import { CreateContact } from "../pages/createContact";
import { NotFound } from "../pages/notFound";
import { Header } from "../components/header";
import { DetailContact } from "../pages/contactDetail";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path='/create' element={ <CreateContact /> } />
        <Route path='/edit/:id' element={ <CreateContact /> } />
        <Route path="/detail/:id" element={<DetailContact />} />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
};