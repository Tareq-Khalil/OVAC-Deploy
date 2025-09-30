import React from "react";
import StarField from "../Components/StarField";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Form from "../Components/BackEnd/form";
const Admission = () => {
  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <StarField />
      <Form />
      <Footer />
    </div>
  );
};
export default Admission;
