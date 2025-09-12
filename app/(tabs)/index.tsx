import { EventList } from '@/components/EventList';
import { CalendarEvent, events as sharedEvents } from '@/components/HealthyCalendarData';
import { MonthlyGrid } from '@/components/MonthlyGrid';
import { WeeklySelector } from '@/components/WeeklySelector';
import { healthyCalendarScreenStyles as styles } from '@/styles/screens/healthyCalendarScreen';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

function HealthyCalendarScreen() {
  const getTodayDateString = () => {
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    return todayUTC.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDateString());

  const dayEvents: CalendarEvent[] = useMemo(() => (sharedEvents as Record<string, CalendarEvent[]>)[selectedDate] || [], [selectedDate]);

  const weekDates = useMemo(() => {
    const date = new Date(selectedDate + 'T00:00:00Z');
    return [...Array(7)].map((_, i) => {
      const d = new Date(date);
      d.setUTCDate(d.getUTCDate() - 3 + i);
      return d;
    });
  }, [selectedDate]);

  const selectedMonthDate = useMemo(() => new Date(selectedDate + 'T00:00:00Z'), [selectedDate]);

  const prevMonthDate = useMemo(() => {
    const d = new Date(selectedMonthDate);
    d.setUTCMonth(d.getUTCMonth() - 1);
    return d;
  }, [selectedMonthDate]);

  const nextMonthDate = useMemo(() => {
    const d = new Date(selectedMonthDate);
    d.setUTCMonth(d.getUTCMonth() + 1);
    return d;
  }, [selectedMonthDate]);

  const handlePrevMonth = () => {
    const d = new Date(selectedDate + 'T00:00:00Z');
    d.setUTCMonth(d.getUTCMonth() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextMonth = () => {
    const d = new Date(selectedDate + 'T00:00:00Z');
    d.setUTCMonth(d.getUTCMonth() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const dateWindow = useMemo(() => {
    const dates = [];
    // Start 2 months before the selected month
    const startDate = new Date(selectedMonthDate);
    startDate.setUTCMonth(startDate.getUTCMonth() - 2);
    startDate.setUTCDate(1);

    // End 2 months after the selected month
    const endDate = new Date(selectedMonthDate);
    endDate.setUTCMonth(endDate.getUTCMonth() + 3);
    endDate.setUTCDate(0);

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    return dates;
  }, [selectedMonthDate]);

  const handleWeekScroll = (date: string) => {
    if (date.substring(0, 7) !== selectedDate.substring(0, 7)) {
      setSelectedDate(date);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MonthlyGrid 
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        events={sharedEvents}
        prevMonthDate={prevMonthDate}
        selectedMonthDate={selectedMonthDate}
        nextMonthDate={nextMonthDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <WeeklySelector 
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        dates={dateWindow}
        onScroll={handleWeekScroll}
      />
      <EventList events={dayEvents} />
    </SafeAreaView>
  );
}

export default HealthyCalendarScreen;
