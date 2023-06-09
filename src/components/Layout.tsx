import { type ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Generator Ikon</title>
        <meta name="description" content="Generator Ikon" />
        <link rel="icon" href="/aiicon.png" />
      </Head>
      <header className="min-w-[400px] bg-neutral-900/50 shadow-md shadow-gray-500">
        <Navbar />
      </header>
      <main className=" mx-auto mt-20 w-11/12 ">{children}</main>
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        autoClose={5000}
      />
    </div>
  );
};

export default Layout;
