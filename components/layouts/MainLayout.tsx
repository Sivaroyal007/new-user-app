import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type MainLayoutProps = {
  children: React.ReactNode;
  className?: string;
};
const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <main className="relative flex min-h-screen w-full flex-col">
      <section className="absolute top-0 w-full bg-transparent">
        <Navbar />
      </section>
      <section className={`flex-grow ${className} h-full`}>{children}</section>
      {/* <footer className="w-full">

      <Footer />
      </footer> */}
    </main>
  );
};

export default MainLayout;
