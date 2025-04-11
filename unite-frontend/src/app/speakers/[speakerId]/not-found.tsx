import Link from "next/link";

export default function SpeakerNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Speaker Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          The speaker profile you're looking for doesn't exist or has been
          removed.
        </p>
        <Link
          href="/speakers"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          View All Speakers
        </Link>
      </div>
    </div>
  );
}
