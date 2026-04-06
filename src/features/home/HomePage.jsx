import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ReminderList from "../reminders/ReminderList";

const HomePage = () => {
  
  // 🧠 REAL DATA (replace later with API or context)
  const stats = {
    reminders: 3,
    done: 1,
    doctors: 4,
    hospitals: 2,
  };

  const quickActions = [
    { label: "Reminders", icon: "💊", link: "/reminders" },
    { label: "Doctors", icon: "🩺", link: "/doctors" },
    { label: "Hospitals", icon: "🏥", link: "/hospitals" },
    { label: "Tips", icon: "💡", link: "/health-tips" },
  ];

  const tipOfTheDay = useMemo(() => {
    return "Drink water before you feel thirsty.";
  }, []);

  // 🧠 REAL REMINDERS DATA (replace later with backend)
  const reminders = [
    { id: 1, title: "Paracetamol", time: "9:00 AM", status: "pending" },
    { id: 2, title: "Vitamin D", time: "2:00 PM", status: "done" },
  ];

  const doctors = [
    { id: 1, name: "Dr. Sharma", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Mehta", specialty: "General Physician" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl shadow-sm border border-green-200">
        <h2 className="text-xl font-semibold mb-2 text-[var(--primary)]">
          Your Health Dashboard
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Stay on top of medications, find doctors, and read today's wellness tip.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 text-center">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-2xl font-bold text-green-600">{stats.reminders}</p>
            <p className="text-xs text-gray-500">Reminders</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{stats.done}</p>
            <p className="text-xs text-gray-500">Done</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-2xl font-bold text-purple-600">{stats.doctors}</p>
            <p className="text-xs text-gray-500">Doctors</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-2xl font-bold text-orange-500">{stats.hospitals}</p>
            <p className="text-xs text-gray-500">Hospitals</p>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Access</h3>

        <div className="grid grid-cols-4 gap-5">
          {quickActions.map((item) => (
            <Link
              key={item.label}
              to={item.link}
              className="bg-white p-5 rounded-2xl border hover:shadow-md transition"
            >
              <div className="text-2xl">{item.icon}</div>
              <p className="mt-3 text-sm font-medium">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* GRID SECTION */}
      <div className="grid grid-cols-2 gap-6">

        {/* TIP */}
        <div className="bg-green-50 p-5 rounded-2xl border border-green-200">
          <h3 className="font-semibold mb-2 text-green-800">
            💡 Tip of the Day
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            {tipOfTheDay}
          </p>
          <Link to="/health-tips" className="text-sm text-green-700 font-medium">
            Read More →
          </Link>
        </div>

        {/* REMINDERS */}
        <div className="bg-white p-5 rounded-2xl border">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Today's Reminders</h3>
            <Link to="/reminders" className="text-sm text-green-600">
              View All →
            </Link>
          </div>

          <ReminderList reminders={reminders} preview readOnly />
        </div>
      </div>

      {/* DOCTORS */}
      <div>
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Nearby Doctors</h3>
          <Link to="/doctors" className="text-sm text-green-600">
            See All →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-5 rounded-2xl border"
            >
              <h4 className="font-semibold">{doc.name}</h4>
              <p className="text-sm text-gray-500">{doc.specialty}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;