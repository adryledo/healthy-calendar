
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import type { FC } from 'react';
import React from 'react';
import { colors } from '@/styles/colors';
import { EventType, SportType } from './HealthyCalendarData';

const activityColorHex: Partial<Record<EventType | SportType, string>> = {
  [SportType.Bike]: colors.blue400,
  [SportType.Strength]: colors.green400,
  [SportType.Run]: colors.red400,
  [SportType.Swim]: colors.yellow400,
  [SportType.Functional]: colors.orange400,
  [SportType.Rowing]: colors.teal400,
  [EventType.Meal]: colors.purple400,
};

export const IconForType: FC<{ type: EventType, subType?: SportType }> = ({ type, subType }) => {
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
