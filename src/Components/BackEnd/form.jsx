import React from "react";

const form = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 relative z-1">
        <form action="">
        <label htmlFor="Name">Your Name</label>
        <input type="text" />
        <label htmlFor="EMail">Your E-mail</label>
        <input type="e-mail" />

        </form>
    </div>
        
  );
};
export default form;
