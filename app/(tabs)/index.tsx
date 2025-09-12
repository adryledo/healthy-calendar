import { EventList } from '@/components/EventList';
import { colors } from '@/styles/colors';
import { CalendarEvent, events as sharedEvents } from '@/components/HealthyCalendarData';
import { MonthlyGrid } from '@/components/MonthlyGrid';
import { WeeklySelector } from '@/components/WeeklySelector';
import { healthyCalendarScreenStyles as styles } from '@/styles/screens/healthyCalendarScreen';
import { useMemo, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function HealthyCalendarScreen() {
  const getTodayDateString = () => {
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    return todayUTC.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [monthlyGridHeight, setMonthlyGridHeight] = useState(0);
  const [weeklySelectorHeight, setWeeklySelectorHeight] = useState(0);

  const scrollY = useRef(new Animated.Value(0)).current;

  const dayEvents: CalendarEvent[] = useMemo(() => (sharedEvents as Record<string, CalendarEvent[]>)[selectedDate] || [], [selectedDate]);
  const selectedMonthDate = useMemo(() => new Date(selectedDate + 'T00:00:00Z'), [selectedDate]);

  const dateWindow = useMemo(() => {
    const dates = [];
    const startDate = new Date(selectedMonthDate);
    startDate.setUTCMonth(startDate.getUTCMonth() - 2);
    startDate.setUTCDate(1);
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

  const handleWeekScroll = (date: string) => {
    if (date.substring(0, 7) !== selectedDate.substring(0, 7)) {
      setSelectedDate(date);
    }
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, monthlyGridHeight],
    outputRange: [0, -monthlyGridHeight],
    extrapolate: 'clamp',
  });

  const headerHeight = monthlyGridHeight + weeklySelectorHeight;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ position: 'absolute', top: 16, left: 16, right: 16, zIndex: 1, transform: [{ translateY: headerTranslateY }] }}>
        <View onLayout={(e) => setMonthlyGridHeight(e.nativeEvent.layout.height)}>
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
        </View>
        <View 
          onLayout={(e) => setWeeklySelectorHeight(e.nativeEvent.layout.height)}
          style={{ backgroundColor: colors.black }}
        >
          <WeeklySelector 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            dates={dateWindow}
            onScroll={handleWeekScroll}
          />
        </View>
      </Animated.View>

      <EventList events={dayEvents} onScroll={onScroll} headerHeight={headerHeight} />
    </SafeAreaView>
  );
}

export default HealthyCalendarScreen;