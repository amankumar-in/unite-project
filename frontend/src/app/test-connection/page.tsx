"use client";

import { useState, useEffect } from "react";
import { fetchAPI, API_URL } from "@/lib/api/api-config";

export default function TestConnection() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Testing connection to:", API_URL);
        const data = await fetchAPI("/hello");
        console.log("Response data:", data);
        setStatus("success");
        setMessage(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Connection test failed:", error);
        setStatus("error");
        setMessage(
          `Connection failed: ${error.message}. Make sure the Strapi server is running and properly configured.`
        );
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>

      <div className="mb-4">
        <p className="mb-2">
          Status:
          <span
            className={
              status === "loading"
                ? "text-yellow-500"
                : status === "success"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {" " + status}
          </span>
        </p>
        <p className="mb-2">Testing connection to: {API_URL}</p>
      </div>

      <div className="p-4 bg-gray-100 rounded-md">
        <pre>{message}</pre>
      </div>
    </div>
  );
}
