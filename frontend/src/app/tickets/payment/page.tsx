import { Suspense } from "react";
import PaymentContent from "./PaymentContent";

export const dynamic = "force-dynamic";

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading purchase details...</p>
          </div>
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
