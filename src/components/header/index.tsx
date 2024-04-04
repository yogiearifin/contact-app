import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full fixed z-10 flex justify-between items-center p-4 bg-[#62B6CB]">
      <Link to='/'><p className="text-2xl font-bold text-white">Contact App</p></Link>
      <Link to='/create'><button>Create Contact</button></Link>
    </header>
  );
};