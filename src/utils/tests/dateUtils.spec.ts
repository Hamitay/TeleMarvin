import { DateTime } from 'luxon';

import {
  parseStringToDateTime,
  parseDateTimeToString,
  parseSQLDateToString,
  isDateInThePast,
} from '../dateUtils';

describe('dateUtils', () => {
  const testDate = '24/09/93';
  const testDateTime = DateTime.fromObject({ year: 1993, month: 9, day: 24, zone: 'America/Sao_Paulo'});

  describe('parseStringToDateTime', () => {
    it('should properly convert formatted date string into DateTime object', () => {
      const result = parseStringToDateTime(testDate);
      expect(result.equals(testDateTime)).toBeTruthy();
    });
  });

  describe('parseDateTimeToString', () => {
    it('should properly convert a DateTime object into a formatted string', () => {
      const result = parseDateTimeToString(testDateTime);
      expect(result).toBe(testDate);
    });
  });

  describe('parseSQLDateToString', () => {
    it('should properly convert a SQL date into a formatted string', () => {
      const result = parseSQLDateToString('1993-09-24');
      expect(result).toBe(testDate);
    });
  });

  describe('isDateInThePast', () => {
    it('should return true if input is before current time', () => {
      expect(isDateInThePast(testDateTime)).toBeTruthy();
    });
  })

  describe('isDateInThePast', () => {
    it('should return false if input is before current time', () => {
      const nowOverride = DateTime.fromObject({ year: 1979, month: 9, day: 24, zone: 'America/Sao_Paulo'});
      expect(isDateInThePast(testDateTime, nowOverride)).toBeFalsy();
    });
  })
})
