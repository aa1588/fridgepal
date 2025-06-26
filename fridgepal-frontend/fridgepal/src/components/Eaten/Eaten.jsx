export default function Eaten() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          ✅ Eaten Items
        </h1>
        <p className="text-gray-600 text-lg text-center">
          Here's a list of items you've already consumed. Great job minimizing
          waste!
        </p>

        {/* Placeholder for eaten item cards */}
        <div className="mt-10 text-center text-gray-400 italic">
          (Feature in development – you'll be able to see eaten history soon!)
        </div>
      </div>
    </div>
  );
}
