import EventDetailClient from "./EventDetailClient";
import { fetchAPI } from "@/lib/api/api-config";

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    // Server-side data fetching
    const response = await fetchAPI("/events");

    let event = null;
    let error = null;

    if (response && response.data) {
      const foundEvent = response.data.find(
        (e) => e.id.toString() === params.id
      );
      if (foundEvent) {
        event = foundEvent;
      } else {
        error = "Event not found";
      }
    } else {
      error = "Failed to load event data";
    }

    // Pass fetched data and any errors to client component
    return <EventDetailClient event={event} error={error} />;
  } catch (err) {
    console.error("Error fetching event:", err);
    return (
      <EventDetailClient
        event={null}
        error="Failed to load event. Please try again later."
      />
    );
  }
}
