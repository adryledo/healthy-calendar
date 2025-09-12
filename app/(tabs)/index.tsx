import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { healthyCalendarScreenStyles as styles } from '@/styles/screens/healthyCalendarScreen';
import { events as sharedEvents, CalendarEvent } from '@/components/HealthyCalendarData';
import { MonthlyGrid } from '@/components/MonthlyGrid';
import { WeeklySelector } from '@/components/WeeklySelector';
import { EventList } from '@/components/EventList';

function HealthyCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('2025-09-02');

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
        weekDates={weekDates}
      />
      <EventList events={dayEvents} />
    </SafeAreaView>
  );
}

export default HealthyCalendarScreen;
