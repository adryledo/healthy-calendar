import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from '@/styles/components/healthyCalendar';
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

      {/* Monthly Grid */}
      <View style={styles.monthlyGridContainer}>
        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          const dateStr = `2025-09-${day.toString().padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;
          const monthDayEvents = events[dateStr] || [];
          return (
            <Pressable
              key={day}
              onPress={() => onDateSelect(dateStr)}
              style={[styles.dayCell, isSelected && styles.dayCellSelected]}
            >
              <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>{day}</Text>
              <View style={styles.eventIconsContainer}>
                {monthDayEvents.map((ev, idx) => {
                  if (ev.type === 'meal') return null; // keep same behavior as web
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
