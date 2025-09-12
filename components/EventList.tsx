import { colors } from '@/styles/colors';
import { eventListStyles as styles } from '@/styles/components/eventList';
import React from 'react';
import { Animated, Text, View } from 'react-native';
import { CalendarEvent, EventType, MealEvent, SportEvent } from './HealthyCalendarData';
import { IconForType } from './IconForType';

interface EventListProps {
  events: CalendarEvent[];
  onScroll: (...args: any[]) => void;
  headerHeight: number;
}

const hrZoneColors: Record<string, string> = {
  Z1: colors.gray400,
  Z2: colors.blue300,
  Z3: colors.yellow300,
  Z4: colors.orange400,
  Z5: colors.red500,
};

export const EventList: React.FC<EventListProps> = ({ events, onScroll, headerHeight }) => {

  const renderItem = ({ item }: { item: CalendarEvent }) => (
    <View style={styles.eventItemContainer}>
      <View style={styles.eventItemIcon}>
        <IconForType
          type={item.type as EventType}
          {...(item.type === EventType.Sport && { subType: (item as SportEvent).sportType })}
        />
      </View>
      <View style={styles.eventItemDetails}>
        <Text style={styles.eventItemTime}>{item.time}</Text>
        <Text style={styles.eventItemTitle}>{item.title}</Text>
        <Text style={styles.eventItemLocation}>{item.location}</Text>
        {item.type === EventType.Sport && (item as SportEvent).distanceInKm != null && (item as SportEvent).distanceInKm! > 0 && (
          <Text style={styles.eventItemExtraInfo}>Dist: {(item as SportEvent).distanceInKm}</Text>
        )}
        {item.type === EventType.Sport && (item as SportEvent).hrZone && (
          <Text style={styles.hrZoneText}>HR: <Text style={{ color: hrZoneColors[(item as SportEvent).hrZone!] || colors.gray400 }}>{(item as SportEvent).hrZone}</Text></Text>
        )}
        {item.expectedDurationInMinutes != null && item.expectedDurationInMinutes > 0 && <Text style={styles.eventItemExtraInfo}>Expected: {item.expectedDurationInMinutes}</Text>}
        {item.type === EventType.Meal && (item as MealEvent).ingredients && (item as MealEvent).ingredients!.length > 0 && (
          <Text style={styles.eventItemExtraInfo}>Ingredients: {(item as MealEvent).ingredients!.join(', ')}</Text>
        )}
        {item.type === EventType.Meal && (item as MealEvent).preparation && (item as MealEvent).preparation!.length > 0 && (
          <Text style={styles.eventItemExtraInfo}>Preparation: {(item as MealEvent).preparation!.join(' ')}</Text>
        )}
      </View>
    </View>
  );

  return (
    <Animated.FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      onScroll={onScroll}
      scrollEventThrottle={16} // Needed for smooth animation
      contentContainerStyle={{ paddingTop: headerHeight }}
      style={styles.eventsScrollView}
    />
  );
};