"use client";
import { useState } from "react";
export default function LeadCaptureForm() {
  const [loading, setLoading] = useState(false);
  ``;
  const handleForm = async (event) => {
    console.log("event", event.target);
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    const dataObject = Object.fromEntries(formData);

    const jsonData = JSON.stringify(dataObject);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    //fetch
    const response = await fetch("api/leads", options);
    const responseData = response.json();
    console.log("responseData", responseData);
    setLoading(false);
  };

  const btnLabel = loading ? "Loading..." : "Join list";
  return (
    <form className="space-x-3" onSubmit={handleForm}>
      <input
        className="text-black"
        type="email"
        name="email"
        required
        placeholder="Your Email"
      />
      <button
        disabled={loading}
        className="bg-green-500 hover:bg-green-700 text-white px-3 rounded"
        type="submit"
      >
        {btnLabel}
      </button>
    </form>
  );
}
