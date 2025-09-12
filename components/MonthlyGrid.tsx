import { monthlyGridStyles as styles } from '@/styles/components/monthlyGrid';
import React, { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AnyEvent, EventType, SportEvent } from './HealthyCalendarData';
import { IconForType } from './IconForType';

interface MonthlyGridProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  events: Record<string, AnyEvent[]>;
  prevMonthDate: Date;
  selectedMonthDate: Date;
  nextMonthDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const MonthlyGrid: React.FC<MonthlyGridProps> = ({ 
  selectedDate, 
  onDateSelect, 
  events, 
  prevMonthDate, 
  selectedMonthDate, 
  nextMonthDate, 
  onPrevMonth, 
  onNextMonth 
}) => {

  const calendarGrid = useMemo(() => {
    const year = selectedMonthDate.getUTCFullYear();
    const month = selectedMonthDate.getUTCMonth();

    const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
    const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
    const daysInMonth = lastDayOfMonth.getUTCDate();
    
    let firstDayOfWeek = firstDayOfMonth.getUTCDay();
    if (firstDayOfWeek === 0) firstDayOfWeek = 7; // Sunday is 0, make it 7
    const startOffset = firstDayOfWeek - 1; // Monday is 1, so offset is 0

    const totalCells = startOffset + daysInMonth;
    const numRows = Math.ceil(totalCells / 7);
    const totalGridCells = numRows * 7;

    const grid = [];

    // Add days from the previous month
    const lastDayOfPrevMonth = new Date(Date.UTC(year, month, 0));
    const daysInPrevMonth = lastDayOfPrevMonth.getUTCDate();
    for (let i = 0; i < startOffset; i++) {
      const day = daysInPrevMonth - startOffset + i + 1;
      const d = new Date(Date.UTC(year, month - 1, day));
      grid.push({
        dayOfMonth: day,
        isCurrentMonth: false,
        dateStr: d.toISOString().split('T')[0],
      });
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(Date.UTC(year, month, i));
      grid.push({
        dayOfMonth: i,
        isCurrentMonth: true,
        dateStr: d.toISOString().split('T')[0],
      });
    }

    // Add days from the next month
    const gridEndOffset = totalGridCells - grid.length;
    for (let i = 1; i <= gridEndOffset; i++) {
      const d = new Date(Date.UTC(year, month + 1, i));
      grid.push({
        dayOfMonth: i,
        isCurrentMonth: false,
        dateStr: d.toISOString().split('T')[0],
      });
    }
    
    return grid;
  }, [selectedMonthDate]);

  const weekDays = useMemo(() => {
    const formatOptions: Intl.DateTimeFormatOptions = { weekday: 'narrow', timeZone: 'UTC' };
    const formatter = new Intl.DateTimeFormat('en-US', formatOptions);
    const monday = new Date(Date.UTC(2017, 0, 2)); // A known Monday

    return [...Array(7)].map((_, i) => {
      const day = new Date(monday);
      day.setUTCDate(monday.getUTCDate() + i);
      return formatter.format(day);
    });
  }, []);

  return (
    <View>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Pressable onPress={onPrevMonth}>
          <Text style={styles.headerText}>{prevMonthDate.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })}</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{selectedMonthDate.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })}</Text>
        <Pressable onPress={onNextMonth}>
          <Text style={styles.headerText}>{nextMonthDate.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })}</Text>
        </Pressable>
      </View>

      {/* Day of Week Headers */}
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <Text key={`${day}-${index}`} style={styles.weekDayHeaderText}>{day}</Text>
        ))}
      </View>

      {/* Monthly Grid */}
      <View style={styles.monthlyGridContainer}>
        {calendarGrid.map((cell, index) => {
          const isSelected = selectedDate === cell.dateStr;
          const monthDayEvents = events[cell.dateStr] || [];
          return (
            <Pressable
              key={cell.dateStr} // Use a more stable key than index
              onPress={() => onDateSelect(cell.dateStr)}
              style={[styles.dayCell, isSelected && styles.dayCellSelected]}
            >
              <Text style={[
                styles.dayText,
                isSelected && styles.dayTextSelected,
                !cell.isCurrentMonth && styles.dayTextNotInMonth
              ]}>
                {cell.dayOfMonth}
              </Text>
              <View style={styles.eventIconsContainer}>
                {monthDayEvents.map((ev, idx) => {
                  if (ev.type === 'meal') return null;
                  return (
                    <View key={idx} style={styles.eventIcon}>
                      <IconForType
                        type={ev.type as EventType}
                        {...(ev.type === EventType.Sport && { subType: (ev as SportEvent).sportType })}
                      />
                    </View>
                  );
                })}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
