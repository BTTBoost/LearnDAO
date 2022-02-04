import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import RegisterUser from "../../components/dashboard/RegisterUser";
import DashboardNavbar from "../../components/DashboardNavbar";

const DashboardIndex = () => {
  const { isAuthenticated, user, isInitializing, isInitialized } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && (!isAuthenticated || !user)) {
      router.replace("/");
    }
  }, [isAuthenticated]);
  if (isInitializing) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Head>
        <title>LearnDAO - Dashboard</title>
      </Head>
      <DashboardNavbar />
      {user?.getEmail() === undefined ? (
        <RegisterUser />
      ) : (
        <div>Has Email - {user.getEmail()}</div>
      )}
    </>
  );
};

export default DashboardIndex;
