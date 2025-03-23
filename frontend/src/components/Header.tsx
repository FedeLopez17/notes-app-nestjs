import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const isArchived = location.pathname.includes("archived");

  return (
    <header className="flex items-end justify-between mb-6">
      <h1 className=" text-4xl font-bold">
        {isArchived ? "Archived Notes" : "Active Notes"}
      </h1>
      <Link to={isArchived ? "/" : "/archived"}>
        {isArchived ? "< Go back to active notes" : "See archived notes >"}
      </Link>
    </header>
  );
};

export default Header;
