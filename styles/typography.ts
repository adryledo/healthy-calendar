import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  textSm: {
    fontSize: 14,
  },
  textLg: {
    fontSize: 18,
  },
  textXs: {
    fontSize: 12,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  fontSemibold: {
    fontWeight: '600',
  },
  textWhite: {
    color: colors.white,
  },
  textGray300: {
    color: colors.gray300,
  },
  textGray400: {
    color: colors.gray400,
  },
  textGray500: {
    color: colors.gray500,
  },
});
