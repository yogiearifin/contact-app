import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage";
import { CreateContact } from "../pages/createContact";
import { NotFound } from "../pages/notFound";
import { Header } from "../components/header";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path='/create' element={ <CreateContact /> } />
        <Route path='/edit/:id' element={ <CreateContact /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  );
};