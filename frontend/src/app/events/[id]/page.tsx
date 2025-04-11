// Simple server component with minimal logic to avoid TypeScript issues
import EventDetails from "./EventDetails";

export default function EventPage({ params }: { params: { id: string } }) {
  return <EventDetails id={params.id} />;
}
