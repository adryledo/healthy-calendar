import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { typography } from '../typography';

export const weeklySelectorStyles = StyleSheet.create({
  weeklySelectorScrollView: {
    marginBottom: 16,
  },
  weeklySelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekDayCell: {
    width: 64,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: colors.zinc800,
  },
  weekDayCellSelected: {
    borderWidth: 1,
    borderColor: colors.blue500,
    backgroundColor: colors.zinc900,
  },
  weekDayName: {
    ...typography.textXs,
    ...typography.textGray300,
  },
  weekDayText: {
    ...typography.textWhite,
  },
});
