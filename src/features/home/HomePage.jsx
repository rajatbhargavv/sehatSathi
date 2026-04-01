import React from 'react';

const HomePage = () => {
  return (
    <div className="p-4 space-y-4">
      
      {/* Greeting Section */}
      <div className="bg-blue-100 p-4 rounded">
        <h2 className="text-lg font-semibold">Good Morning 👋</h2>
        <p className="text-sm text-gray-600">
          Stay healthy and manage your care easily
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="p-3 bg-blue-500 text-white rounded">Reminders</button>
        <button className="p-3 bg-green-500 text-white rounded">Doctors</button>
        <button className="p-3 bg-purple-500 text-white rounded">Hospitals</button>
        <button className="p-3 bg-orange-500 text-white rounded">Tips</button>
      </div>

      {/* Today Tip */}
      <div className="bg-yellow-100 p-4 rounded">
        <h3 className="font-semibold">Today’s Tip</h3>
        <p className="text-sm">
          Drink plenty of water and take medicines on time.
        </p>
      </div>

      {/* Reminder Preview */}
      <div>
        <h3 className="font-semibold mb-2">Upcoming Reminders</h3>
        <p className="text-sm text-gray-500">No reminders yet</p>
      </div>

      {/* Doctor Preview */}
      <div>
        <h3 className="font-semibold mb-2">Your Doctors</h3>
        <p className="text-sm text-gray-500">No doctors added</p>
      </div>

    </div>
  );
};

export default HomePage;