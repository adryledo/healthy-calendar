import { colors } from '@/styles/colors';
import { styles } from '@/styles/components/healthyCalendar';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarEvent, EventType, MealEvent, events as sharedEvents, SportEvent, SportType } from './HealthyCalendarData';

const activityColorHex: Partial<Record<EventType | SportType, string>> = {
  [SportType.Bike]: colors.blue400,
  [SportType.Strength]: colors.green400,
  [SportType.Run]: colors.red400,
  [SportType.Swim]: colors.yellow400,
  [SportType.Functional]: colors.orange400,
  [SportType.Rowing]: colors.teal400,
  [EventType.Meal]: colors.purple400,
};

const hrZoneColors: Record<string, string> = {
  Z1: colors.gray400,
  Z2: colors.blue300,
  Z3: colors.yellow300,
  Z4: colors.orange400,
  Z5: colors.red500,
};

const IconForType: FC<{ type: EventType, subType?: SportType }> = ({ type, subType }) => {
  const color = (type === EventType.Sport && subType)
    ? activityColorHex[subType]
    : activityColorHex[type] || '#9CA3AF';

  switch (true) {
    case type === EventType.Meal:
      return <FontAwesome name="cutlery" size={16} color={color} />;

    case subType === SportType.Bike:
      return <FontAwesome name="bicycle" size={16} color={color} />;

    case subType === SportType.Strength:
      return <MaterialIcons name="fitness-center" size={16} color={color} />;

    case subType === SportType.Rowing:
      return <MaterialIcons name="rowing" size={16} color={color} />;

    case subType === SportType.Functional:
      return <FontAwesome name="tasks" size={16} color={color} />;

    case subType === SportType.Run:
      return <FontAwesome name="road" size={16} color={color} />;

    case subType === SportType.Swim:
      return <FontAwesome name="tint" size={16} color={color} />;

    default:
      return <FontAwesome name="circle" size={16} color={color} />;
  }
};


function HealthyCalendarNative() {
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Pressable onPress={() => {
          const d = new Date(selectedDate + 'T00:00:00Z');
          d.setUTCMonth(d.getUTCMonth() - 1);
          const next = d.toISOString().split('T')[0];
          setSelectedDate(next);
        }}>
          <Text style={styles.headerText}>
            {prevMonthDate.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })}
          </Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {selectedMonthDate.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })}
        </Text>
        <Pressable onPress={() => {
          const d = new Date(selectedDate + 'T00:00:00Z');
          d.setUTCMonth(d.getUTCMonth() + 1);
          const next = d.toISOString().split('T')[0];
          setSelectedDate(next);
        }}>
          <Text style={styles.headerText}>
            {nextMonthDate.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })}
          </Text>
        </Pressable>
      </View>

      {/* Monthly Grid */}
      <View style={styles.monthlyGridContainer}>
        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          const dateStr = `2025-09-${day.toString().padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;
          const monthDayEvents = (sharedEvents as Record<string, CalendarEvent[]>)[dateStr] || [];
          return (
            <Pressable
              key={day}
              onPress={() => setSelectedDate(dateStr)}
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

      {/* Weekly Selector */}
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
                onPress={() => setSelectedDate(dateStr)}
                style={[styles.weekDayCell, isSel && styles.weekDayCellSelected]}
              >
                <Text style={styles.weekDayName}>{dayName}</Text>
                <Text style={styles.weekDayText}>{day}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Events list */}
      <ScrollView style={styles.eventsScrollView}>
        {dayEvents.map((ev, idx) => (
          <View key={idx} style={styles.eventItemContainer}>
            <View style={styles.eventItemIcon}>
              <IconForType
                type={ev.type as EventType}
                {...(ev.type === EventType.Sport && { subType: (ev as SportEvent).sportType })}
              />
            </View>
            <View style={styles.eventItemDetails}>
              <Text style={styles.eventItemTime}>{ev.time}</Text>
              <Text style={styles.eventItemTitle}>{ev.title}</Text>
              <Text style={styles.eventItemLocation}>{ev.location}</Text>
              {ev.type === EventType.Sport && (ev as SportEvent).distanceInKm != null && (ev as SportEvent).distanceInKm > 0 && (
                <Text style={styles.eventItemExtraInfo}>Dist: {(ev as SportEvent).distanceInKm}</Text>
              )}
              {ev.type === EventType.Sport && (ev as SportEvent).hrZone && (
                <Text style={styles.hrZoneText}>HR: <Text style={{ color: hrZoneColors[(ev as SportEvent).hrZone!] || colors.gray400 }}>{(ev as SportEvent).hrZone}</Text></Text>
              )}
              {ev.expectedDurationInMinutes != null && ev.expectedDurationInMinutes > 0 && <Text style={styles.eventItemExtraInfo}>Expected: {ev.expectedDurationInMinutes}</Text>}
              {ev.type === EventType.Meal && (ev as MealEvent).ingredients && (ev as MealEvent).ingredients!.length > 0 && (
                <Text style={styles.eventItemExtraInfo}>Ingredients: {(ev as MealEvent).ingredients!.join(', ')}</Text>
              )}
              {ev.type === EventType.Meal && (ev as MealEvent).preparation && (ev as MealEvent).preparation!.length > 0 && (
                <Text style={styles.eventItemExtraInfo}>Preparation: {(ev as MealEvent).preparation!.join(' ')}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HealthyCalendarNative;
