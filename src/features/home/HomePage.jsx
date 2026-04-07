import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import ReminderList from "../reminders/ReminderList";
import Card from "../../components/ui/Card";
import HeroCard from "./components/HeroCard";
import QuickActions from "./components/QuickActions";
import TodayTipCard from "./components/TodayTipCard";
import NearbyDoctorsPreview from "./components/NearbyDoctorsPreview";
import { getTodayTip } from "../../utils/getTodayTip";
import { getDoctors } from "../../services/doctorService";
import { getHospitals } from "../../services/hospitalService";
import { useReminders } from "../reminders/reminderHooks";

const HomePage = () => {
  const { reminders, handleToggleReminderStatus } = useReminders();
  const doctors = getDoctors();
  const hospitals = getHospitals();

  const doneCount = reminders.filter(
    (item) => item?.status === "done" || item?.done === true || item?.completed === true
  ).length;

  const stats = {
    reminders: reminders.length,
    done: doneCount,
    doctors: doctors.length,
    hospitals: hospitals.length,
  };

  const todayLabel = useMemo(() => {
    const now = new Date();
    const weekday = now.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
    const day = now.toLocaleDateString("en-US", { day: "2-digit" });
    const month = now.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
    const year = now.getFullYear();
    return `TODAY - ${weekday}, ${day} ${month} ${year}`;
  }, []);

  const quickActions = [
    { label: "Reminders", icon: "💊", link: "/reminders" },
    { label: "Doctors", icon: "🩺", link: "/doctors" },
    { label: "Hospitals", icon: "🏥", link: "/hospitals" },
    { label: "Tips", icon: "💡", link: "/health-tips" },
  ];

  const tipOfTheDay = useMemo(() => {
    const tip = getTodayTip();
    return tip?.tip ?? "Drink water before you feel thirsty.";
  }, []);

  const statCards = [
    { key: "reminders", value: stats.reminders, label: "Reminders Today" },
    { key: "done", value: stats.done, label: "Done" },
    { key: "doctors", value: stats.doctors, label: "Nearby Doctors" },
    { key: "hospitals", value: stats.hospitals, label: "Hospitals" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <HeroCard todayLabel={todayLabel} statCards={statCards} />

      <QuickActions items={quickActions} />

      <TodayTipCard tip={tipOfTheDay} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-[var(--text)]">Today&apos;s Reminders</h3>
            <Link to="/reminders" className="text-sm font-bold text-[var(--primary)]">
              View All →
            </Link>
          </div>
          <ReminderList
            reminders={reminders}
            preview
            readOnly={false}
            handleToggleReminderStatus={handleToggleReminderStatus}
          />
        </Card>

        <NearbyDoctorsPreview doctors={doctors} />
      </div>

    </div>
  );
};

export default HomePage;