import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-400 border-b border-slate-900">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-teal-600 font-mono tracking-tight">My-Notes</h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn shadow-lg shadow-cyan-900/30 bg-teal-800 hover:bg-teal-900">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;