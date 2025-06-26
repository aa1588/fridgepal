import about from "../../assets/logo3.jpg";

export default function About() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-100 to-rose-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="lg:w-6/12 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6 leading-tight">
              About <span className="text-rose-600">FridgePal</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              FridgePal is your smart fridge assistant that helps track your
              groceries, reduce food waste, and remind you before items expire.
            </p>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-indigo-100 text-left space-y-4">
              <p className="text-gray-800 font-medium">
                Built with{" "}
                <span className="font-semibold text-indigo-600">React</span> &{" "}
                <span className="font-semibold text-rose-600">FastAPI</span>,
                FridgePal helps you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Add and manage fridge items with expiry reminders</li>
                <li>Track what you've eaten or discarded</li>
                <li>Get alerts for soon-to-expire items</li>
                <li>Stay organized and reduce food waste</li>
              </ul>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-6/12">
            <img
              src={about}
              alt="foods stored in fridge"
              className="w-full rounded-2xl shadow-2xl border-4 border-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
