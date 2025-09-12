import { weeklySelectorStyles as styles } from '@/styles/components/weeklySelector';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, Text, View, ViewToken } from 'react-native';

interface WeeklySelectorProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  dates: Date[];
  onScroll: (date: string) => void;
}

const ITEM_WIDTH = 64 + 12; // Cell width (64) + margin-right (12)

export const WeeklySelector: React.FC<WeeklySelectorProps> = ({ selectedDate, onDateSelect, dates, onScroll }) => {
  const flatListRef = useRef<FlatList>(null);
  const isScrollingProgrammatically = useRef(false);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  const listData = useMemo(() => {
    return dates.map(d => ({
      date: d,
      dateStr: d.toISOString().split('T')[0],
    }));
  }, [dates]);

  useEffect(() => {
    const selectedIndex = listData.findIndex(d => d.dateStr === selectedDate);
    if (flatListRef.current && selectedIndex !== -1) {
      isScrollingProgrammatically.current = true;
      flatListRef.current.scrollToIndex({
        index: selectedIndex,
        animated: true,
        viewPosition: 0.5,
      });
      // After the scroll animation, re-enable user scroll events.
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
        // Use functional update to avoid dependency warning
        setInitialScrollDone(isDone => {
          if (!isDone) return true;
          return isDone;
        });
      }, 500); // 500ms should be enough for the animation to complete.
    }
  }, [selectedDate, listData]);

  // --- FIX for Web: Use refs to create a stable onViewableItemsChanged callback ---
  const onScrollRef = useRef(onScroll);
  const initialScrollDoneRef = useRef(initialScrollDone);
  useEffect(() => {
    onScrollRef.current = onScroll;
    initialScrollDoneRef.current = initialScrollDone;
  });

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (isScrollingProgrammatically.current || !initialScrollDoneRef.current) return;

    if (viewableItems.length > 0) {
      const centerItem = viewableItems.find(item => item.isViewable);
      if (centerItem && centerItem.item) {
        onScrollRef.current(centerItem.item.dateStr);
      }
    }
  }, []); // Empty dependency array makes the function stable

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  const renderItem = ({ item }: { item: { date: Date, dateStr: string } }) => {
    const day = item.date.getUTCDate();
    const dayName = item.date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
    const isSel = selectedDate === item.dateStr;

    return (
      <Pressable
        onPress={() => onDateSelect(item.dateStr)}
        style={[styles.weekDayCell, isSel && styles.weekDayCellSelected]}
      >
        <Text style={styles.weekDayName}>{dayName}</Text>
        <Text style={styles.weekDayText}>{day}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.weeklySelectorScrollView}>
      <FlatList
        ref={flatListRef}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.dateStr}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        extraData={selectedDate}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true, viewPosition: 0.5 });
          });
        }}
      />
    </View>
  );
};
