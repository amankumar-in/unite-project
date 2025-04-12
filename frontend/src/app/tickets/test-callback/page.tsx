import { Suspense } from "react";
import TestCallbackContent from "./TestCallbackContent";

export const dynamic = "force-dynamic";

export default function TestCallbackPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Pesapal Test Callback</h1>

      <Suspense fallback={<div>Loading payment information...</div>}>
        <TestCallbackContent />
      </Suspense>
    </div>
  );
}
