import React from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { styles } from '@/styles/components/healthyCalendar';

interface WeeklySelectorProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  weekDates: Date[];
}

export const WeeklySelector: React.FC<WeeklySelectorProps> = ({ selectedDate, onDateSelect, weekDates }) => {
  return (
    <ScrollView horizontal contentContainerStyle={{ paddingVertical: 8 }} showsHorizontalScrollIndicator={false} style={styles.weeklySelectorScrollView}>
      <View style={styles.weeklySelectorContainer}>
        {weekDates.map((date) => {
          const day = date.getUTCDate();
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
          const dateStr = date.toISOString().split('T')[0];
          const isSel = selectedDate === dateStr;
          return (
            <Pressable
              key={dateStr}
              onPress={() => onDateSelect(dateStr)}
              style={[styles.weekDayCell, isSel && styles.weekDayCellSelected]}
            >
              <Text style={styles.weekDayName}>{dayName}</Text>
              <Text style={styles.weekDayText}>{day}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};
