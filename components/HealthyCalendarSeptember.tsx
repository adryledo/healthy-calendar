import { Card, CardContent } from '@mui/material';
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { FaBiking, FaDumbbell, FaUtensils } from 'react-icons/fa';
import { LuUtensilsCrossed } from 'react-icons/lu';
import { MdRowing } from 'react-icons/md';

// import shared types and events from central data file
import { CalendarEvent, events, EventType, MealEvent, SportEvent, SportType } from './HealthyCalendarData';

const activityColors: Record<string, string> = {
  bike: "text-blue-400",
  strength: "text-green-400",
  run: "text-red-400",
  swim: "text-yellow-400",
  meal: "text-purple-400",
  functional: "text-orange-400", // Added functional color
  rowing: "text-teal-400",      // Added rowing color
};

const hrZoneColors: Record<string, string> = {
  Z1: "text-gray-400",
  Z2: "text-blue-300",
  Z3: "text-yellow-300",
  Z4: "text-orange-400",
  Z5: "text-red-500",
};

const IconForTypeWeb = ({ type, subType }: { type: EventType, subType?: SportType }) => {
  switch (true) {
    case type === EventType.Meal:
      return <FaUtensils size={14} className="text-purple-400" />;
    case subType === SportType.Bike:
      return <FaBiking size={14} className="text-blue-400" />;
    case subType === SportType.Strength:
      return <FaDumbbell size={14} className="text-green-400" />;
    case subType === SportType.Rowing:
      return <MdRowing size={14} className="text-teal-400" />;
    case subType === SportType.Functional:
      return <LuUtensilsCrossed size={14} className="text-orange-400" />;
    default:
      return <FaUtensils size={14} className="text-gray-400" />;
  }
};

export default function HealthyCalendar() {
  const [selectedDate, setSelectedDate] = useState("2025-09-02"); // Updated initial state

  const dayEvents = useMemo(() => events[selectedDate] || [], [selectedDate]);

  // Weekly view centered around selectedDate
  const weekDates = useMemo(() => {
    const date = new Date(selectedDate + 'T00:00:00'); // Ensure timezone consistency
    return [...Array(7)].map((_, i) => {
      const d = new Date(date);
      d.setDate(date.getDate() - 3 + i); // 3 days before, 3 days after
      return d;
    });
  }, [selectedDate]);

  const renderEvents = () => {
    return dayEvents.map((event: CalendarEvent, idx: number) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
      >
        <Card className="mb-4 rounded-2xl bg-zinc-900 text-white shadow-lg">
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`flex-shrink-0 ${activityColors[event.type] || "text-gray-400"}`}>
              <IconForTypeWeb type={event.type as EventType} {...event.type === EventType.Sport && { subType: (event as SportEvent).sportType }} />
            </div>
            <div>
              <p className="text-sm text-gray-400">{event.time}</p>
              <h3 className="text-lg font-semibold mt-1">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.location}</p>
              {/* Conditionally render details based on event type */}
              {event.type === EventType.Sport && (
                <>
                  {(event as SportEvent).distanceInKm && <p className="text-xs text-gray-400 mt-1">Dist: {(event as SportEvent).distanceInKm}</p>}
                  {(event as SportEvent).hrZone && (
                    <p className="text-xs mt-1">
                      HR: <span className={`${hrZoneColors[(event as SportEvent).hrZone!] || "text-gray-400"}`}>{(event as SportEvent).hrZone}</span>
                    </p>
                  )}
                  {event.expectedDurationInMinutes && <p className="text-xs text-gray-400">Expected: {event.expectedDurationInMinutes}</p>}
                </>
              )}
              {event.type === EventType.Meal && (
                <>
                  {(event as MealEvent).ingredients && (event as MealEvent).ingredients!.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      <strong>Ingredients:</strong> {(event as MealEvent).ingredients!.join(", ")}
                    </p>
                  )}
                  {(event as MealEvent).preparation && (event as MealEvent).preparation!.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      <strong>Preparation:</strong> {(event as MealEvent).preparation!.join(" ")}
                    </p>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ));
  };

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-gray-400">August</button>
        <h2 className="text-xl font-bold">September</h2> {/* Updated month */}
        <button className="text-gray-400">October</button>
      </div>

      {/* Monthly Calendar */}
      <div className="grid grid-cols-7 gap-2 text-center mb-8">
        {[...Array(30)].map((_, i: number) => { // Updated for 30 days of September
          const day = i + 1;
          const dateStr = `2025-09-${day.toString().padStart(2, "0")}`; // Updated month
          const isSelected = selectedDate === dateStr;
          // avoid shadowing the component-level dayEvents variable
          const monthDayEvents = events[dateStr] || [];
          return (
            <button
              key={day}
              className={`p-2 rounded-lg text-sm font-medium transition-colors duration-200 flex flex-col items-center justify-center border ${
                isSelected ? "border-blue-500 text-white" : "border-transparent text-gray-400 hover:bg-zinc-800"
              }`}
              onClick={() => setSelectedDate(dateStr)}
            >
              <span>{day}</span>
              <div className="flex gap-1 mt-1 flex-wrap justify-center">
                {monthDayEvents.map((ev: CalendarEvent, idx: number) => {
                  if (ev.type === 'meal') return null; // Skip meal icons in monthly view
                  return (
                    <IconForTypeWeb 
                      type={ev.type as EventType}
                      {...(ev.type === EventType.Sport && { subType: (ev as SportEvent).sportType })}
                      key={idx}
                    />
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>

      {/* Weekly View */}
      <div className="flex justify-center space-x-3 overflow-x-auto mb-6 scrollbar-hide">
        {weekDates.map((date) => {
          const day = date.getDate();
          const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          const dateStr = date.toISOString().split("T")[0];
          const isSelected = selectedDate === dateStr;
          return (
            <button
              key={dateStr}
              className={`px-4 py-2 rounded-xl font-medium transition-colors duration-200 flex flex-col items-center border ${
                isSelected ? "border-blue-500 text-white" : "border-transparent bg-zinc-800 text-gray-300 hover:bg-zinc-700"
              }`}
              onClick={() => setSelectedDate(dateStr)}
            >
              <span className="text-xs">{dayName}</span>
              <span>{day}</span>
            </button>
          );
        })}
      </div>

      {/* Events */}
      <div>{renderEvents()}</div>
    </div>
  );
}