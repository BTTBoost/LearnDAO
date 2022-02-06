import React from "react";
import { useMoralis } from "react-moralis";
import BtnGradientBorder from "./common/BtnGradientBorder";
import LearnDAOLogo from "./common/LearnDAOLogo";

const DashboardNavbar = () => {
  const { isAuthenticated, user, logout } = useMoralis();

  return (
    <>
      <header className="border-b border-gray-700">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <LearnDAOLogo />

          <nav className="flex items-center space-x-1 text-sm font-medium text-gray-800">
            <BtnGradientBorder
              title={isAuthenticated && user ? "Disconnect" : "Connect"}
              onClick={async () => {
                logout();
              }}
            />
          </nav>
        </div>
      </header>
    </>
  );
};

export default DashboardNavbar;
