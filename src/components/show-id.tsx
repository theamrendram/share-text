import Link from "next/link";

const ShowId = ({ id }: { id: string }) => {
  return (
    <div className="w-96 h-96 bg-white rounded-2xl shadow-lg border border-gray-200 transition-all duration-200 hover:shadow-xl">
      <div className="flex flex-col items-center justify-center h-full p-6 gap-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">
            Text is now available to share!
          </h2>
          <div className="bg-gray-50 px-4 py-3 rounded-lg border">
            <p className="text-sm text-gray-500 mb-1">Your text ID:</p>
            <p className="text-lg font-mono font-bold text-gray-800 break-all">
              {id}
            </p>
          </div>
        </div>

        <Link
          href={`/c/${id}`}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-200 shadow-sm hover:shadow-md">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Open Post
        </Link>

        <button
          onClick={() => {
            navigator.clipboard.writeText(id);
          }}
          className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200">
          Copy ID to clipboard (https://domain.com/c/{id})
        </button>
      </div>
    </div>
  );
};

export default ShowId;
