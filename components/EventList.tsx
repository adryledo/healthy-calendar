import { colors } from '@/styles/colors';
import { eventListStyles as styles } from '@/styles/components/eventList';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CalendarEvent, EventType, MealEvent, SportEvent } from './HealthyCalendarData';
import { IconForType } from './IconForType';

interface EventListProps {
  events: CalendarEvent[];
}

const hrZoneColors: Record<string, string> = {
  Z1: colors.gray400,
  Z2: colors.blue300,
  Z3: colors.yellow300,
  Z4: colors.orange400,
  Z5: colors.red500,
};

export const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <ScrollView style={styles.eventsScrollView}>
      {events.map((ev, idx) => (
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
            {ev.type === EventType.Sport && (ev as SportEvent).distanceInKm != null && (ev as SportEvent).distanceInKm! > 0 && (
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
  );
};
