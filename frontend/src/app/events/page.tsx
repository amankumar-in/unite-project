"use client";

import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/api/api-config";

// Updated interface to match actual API response
interface Event {
  id: number;
  documentId: string;
  Name: string;
  Description: string;
  Date: string;
  Location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetchAPI("/events");
        console.log("Events response:", response);

        if (response && response.data) {
          setEvents(response.data);
        } else {
          setEvents([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "No date provided";
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (_) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">UNITE Events</h1>
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">UNITE Events</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">UNITE Events</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {event.Name || "Unnamed Event"}
                </h2>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Date:</span>{" "}
                  {formatDate(event.Date)}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Location:</span>{" "}
                  {event.Location || "No location specified"}
                </p>
                <div className="mt-2 text-gray-700">
                  {event.Description
                    ? `${event.Description.substring(0, 150)}${
                        event.Description.length > 150 ? "..." : ""
                      }`
                    : "No description available"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
