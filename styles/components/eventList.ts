import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { typography } from '../typography';

export const eventListStyles = StyleSheet.create({
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
