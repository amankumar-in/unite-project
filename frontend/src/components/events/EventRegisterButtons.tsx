"use client";

import { useState } from "react";

interface EventRegisterButtonsProps {
  eventId: number;
}

export default function EventRegisterButtons({
  eventId,
}: EventRegisterButtonsProps) {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = () => {
    setIsRegistering(true);
    // In a real app, you would call an API to register for the event
    setTimeout(() => {
      alert("Registration successful!");
      setIsRegistering(false);
    }, 1000);
  };

  const handleAddToCalendar = () => {
    // In a real app, you would generate a calendar file or link
    alert("Added to calendar!");
  };

  return (
    <div className="mt-8 space-y-4">
      <button
        type="button"
        onClick={handleRegister}
        disabled={isRegistering}
        className="w-full bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75"
      >
        {isRegistering ? "Processing..." : "Register for This Event"}
      </button>
      <button
        type="button"
        onClick={handleAddToCalendar}
        className="w-full bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add to Calendar
      </button>
    </div>
  );
}
