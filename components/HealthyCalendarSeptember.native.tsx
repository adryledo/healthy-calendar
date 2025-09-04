import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { CalendarEvent, EventType, MealEvent, events as sharedEvents, SportEvent, SportType } from './HealthyCalendarData';

const activityColorHex: Record<string, string> = {
  bike: '#60A5FA', // blue-400
  strength: '#34D399', // green-400
  run: '#F87171', // red-400
  swim: '#FBBF24', // yellow-400
  meal: '#A78BFA', // purple-400
  functional: '#FB923C', // orange-400
  rowing: '#2DD4BF', // teal-400
};

const hrZoneColors: Record<string, string> = {
  Z1: "text-gray-400",
  Z2: "text-blue-300",
  Z3: "text-yellow-300",
  Z4: "text-orange-400",
  Z5: "text-red-500",
};

const IconForType: FC<{ type: EventType, subType?: SportType }> = ({ type, subType }) => {
  const color = activityColorHex[type] || '#9CA3AF';

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


export default function HealthyCalendarNative() {
  const [selectedDate, setSelectedDate] = useState('2025-09-02');

  const dayEvents: CalendarEvent[] = useMemo(() => (sharedEvents as Record<string, CalendarEvent[]>)[selectedDate] || [], [selectedDate]);

  const weekDates = useMemo(() => {
    const date = new Date(selectedDate + 'T00:00:00');
    return [...Array(7)].map((_, i) => {
      const d = new Date(date);
      d.setDate(date.getDate() - 3 + i);
      return d;
    });
  }, [selectedDate]);

  return (
    <SafeAreaView className="flex-1 bg-black p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Pressable onPress={() => {
          // go to previous month (simple decrement by 1 day)
          const d = new Date(selectedDate + 'T00:00:00');
          d.setMonth(d.getMonth() - 1);
          const next = d.toISOString().split('T')[0];
          setSelectedDate(next);
        }}>
          <Text className="text-gray-400">August</Text>
        </Pressable>
        <Text className="text-white text-lg font-bold">September</Text>
        <Pressable onPress={() => {
          const d = new Date(selectedDate + 'T00:00:00');
          d.setMonth(d.getMonth() + 1);
          const next = d.toISOString().split('T')[0];
          setSelectedDate(next);
        }}>
          <Text className="text-gray-400">October</Text>
        </Pressable>
      </View>

      {/* Monthly Grid */}
      <View className="flex-row flex-wrap -m-1 mb-4">
        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          const dateStr = `2025-09-${day.toString().padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;
          const monthDayEvents = (sharedEvents as Record<string, CalendarEvent[]>)[dateStr] || [];
          return (
            <Pressable
              key={day}
              onPress={() => setSelectedDate(dateStr)}
              className={`p-2 m-1 w-[12%] rounded-lg items-center justify-center ${isSelected ? 'border border-blue-500' : 'border-transparent'} bg-zinc-900`}
            >
              <Text className={`text-sm ${isSelected ? 'text-white' : 'text-gray-400'}`}>{day}</Text>
              <View className="flex-row flex-wrap mt-1 justify-center">
                {monthDayEvents.map((ev, idx) => {
                  if (ev.type === 'meal') return null; // keep same behavior as web
                  return (
                    <View key={idx} className="mr-1">
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
      <ScrollView horizontal contentContainerStyle={{ paddingVertical: 8 }} showsHorizontalScrollIndicator={false} className="mb-4">
        <View className="flex-row items-center">
          {weekDates.map((date) => {
            const day = date.getDate();
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dateStr = date.toISOString().split('T')[0];
            const isSel = selectedDate === dateStr;
            return (
              <Pressable
                key={dateStr}
                onPress={() => setSelectedDate(dateStr)}
                className={`px-4 py-2 rounded-xl mr-3 ${isSel ? 'border border-blue-500 bg-zinc-900' : 'bg-zinc-800'}`}
              >
                <Text className="text-xs text-gray-300">{dayName}</Text>
                <Text className="text-white">{day}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Events list */}
      <ScrollView className="flex-1">
        {dayEvents.map((ev, idx) => (
          <View key={idx} className="bg-zinc-900 rounded-2xl p-4 mb-4 flex-row items-start">
            <View className="mr-4 mt-1">
              <IconForType
                type={ev.type as EventType}
                {...(ev.type === EventType.Sport && { subType: (ev as SportEvent).sportType })}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text className="text-sm text-gray-400">{ev.time}</Text>
              <Text className="text-lg text-white font-semibold mt-1">{ev.title}</Text>
              <Text className="text-sm text-gray-500">{ev.location}</Text>
              {ev.type === EventType.Sport && (ev as SportEvent).distanceInKm && (
                <Text className="text-xs text-gray-400 mt-1">Dist: {(ev as SportEvent).distanceInKm}</Text>
              )}
              {ev.type === EventType.Sport && (ev as SportEvent).hrZone && (
                <Text className="text-xs mt-1">HR: <Text className={`${hrZoneColors[(ev as SportEvent).hrZone!] || "text-gray-400"}`}>{(ev as SportEvent).hrZone}</Text></Text>
              )}
              {ev.expectedDurationInMinutes && <Text className="text-xs text-gray-400 mt-1">Expected: {ev.expectedDurationInMinutes}</Text>}

              {ev.type === EventType.Meal && (ev as MealEvent).ingredients && (ev as MealEvent).ingredients!.length > 0 && (
                <Text className="text-xs text-gray-400 mt-1">Ingredients: {(ev as MealEvent).ingredients!.join(', ')}</Text>
              )}

              {ev.type === EventType.Meal && (ev as MealEvent).preparation && (ev as MealEvent).preparation!.length > 0 && (
                <Text className="text-xs text-gray-400 mt-1">Preparation: {(ev as MealEvent).preparation!.join(' ')}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
