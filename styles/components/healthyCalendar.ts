import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { typography } from '../typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 16,
  },
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
  weeklySelectorScrollView: {
    marginBottom: 16,
  },
  weeklySelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekDayCell: {
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
  eventsScrollView: {
    flex: 1,
  },
  eventItemContainer: {
    backgroundColor: colors.zinc900,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  eventItemIcon: {
    marginRight: 16,
    marginTop: 4,
  },
  eventItemDetails: {
    flex: 1,
  },
  eventItemTime: {
    ...typography.textSm,
    ...typography.textGray400,
  },
  eventItemTitle: {
    ...typography.textLg,
    ...typography.textWhite,
    ...typography.fontSemibold,
    marginTop: 4,
  },
  eventItemLocation: {
    ...typography.textSm,
    ...typography.textGray500,
  },
  eventItemExtraInfo: {
    ...typography.textXs,
    ...typography.textGray400,
    marginTop: 4,
  },
  hrZoneText: {
    ...typography.textXs,
    marginTop: 4,
    color: colors.gray400,
  },
});
