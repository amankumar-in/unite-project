"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function TestCallbackPage() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    // Extract all parameters from the URL
    const paramEntries = Array.from(searchParams.entries());
    const paramObj = Object.fromEntries(paramEntries);

    setParams(paramObj);

    // Log all parameters
    console.log("Callback parameters:", paramObj);
  }, [searchParams]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Payment Callback</h1>
          <p className="mt-2 text-gray-600">
            This page receives the redirect from Pesapal after payment
            processing.
          </p>
          <div className="mt-4">
            <Link
              href="/tickets/test-payment"
              className="text-green-600 hover:text-green-700 inline-flex items-center text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Test Payment
            </Link>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Callback Parameters
            </h2>

            {Object.keys(params).length > 0 ? (
              <div>
                <div className="mt-2 bg-green-50 p-4 rounded-md mb-4 border-l-4 border-green-400">
                  <p className="text-sm text-green-700">
                    <span className="font-bold">Success!</span> Payment callback
                    received.
                  </p>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-md overflow-auto">
                  <dl className="divide-y divide-gray-200">
                    {Object.entries(params).map(([key, value]) => (
                      <div key={key} className="py-3 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">
                          {key}
                        </dt>
                        <dd className="text-sm text-gray-900 ml-4 text-right">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {params.OrderTrackingId && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-700 mb-2">
                      To check the status of this payment, we can query the
                      Pesapal API using the Order Tracking ID.
                    </p>
                    <p className="text-sm text-gray-700">
                      This would normally be done automatically as part of your
                      application's payment processing flow.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      No callback parameters found. This page should be loaded
                      as a redirect from Pesapal after payment.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
