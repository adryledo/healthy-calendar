import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { typography } from '../typography';

export const monthlyGridStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    ...typography.textGray400,
  },
  headerTitle: {
    ...typography.textWhite,
    ...typography.textLg,
    ...typography.fontBold,
  },
  monthlyGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4,
    marginBottom: 16,
  },
  dayCell: {
    padding: 8,
    margin: 4,
    width: '12%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.zinc900,
    borderWidth: 1,
    borderColor: colors.transparent,
  },
  dayCellSelected: {
    borderColor: colors.blue500,
  },
  dayText: {
    ...typography.textSm,
    ...typography.textGray400,
  },
  dayTextSelected: {
    ...typography.textWhite,
  },
  eventIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    justifyContent: 'center',
  },
  eventIcon: {
    marginRight: 4,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDayHeaderText: {
    color: colors.gray500,
    fontSize: 12,
    width: '12%',
    textAlign: 'center',
  },
  dayTextNotInMonth: {
    color: colors.gray500,
  },
});
