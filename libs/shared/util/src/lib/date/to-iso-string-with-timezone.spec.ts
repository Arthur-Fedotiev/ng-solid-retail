import { toISOStringWithTimezone } from './to-iso-string-with-timezone';
const testCases = [
  {
    date: new Date(2020, 0, 1, 0, 0, 0, 0),
    timeZone: 'America/New_York',
    localeArgument: 'en-US',
    expected: '2020-01-01T00:00:00',
  },
  {
    date: new Date(2020, 0, 1, 0, 0, 0, 0),
    timeZone: 'America/Los_Angeles',
    localeArgument: 'en-US',
    expected: '2020-01-01T00:00:00',
  },
  {
    date: new Date(2020, 0, 1, 0, 0, 0, 0),
    timeZone: 'Europe/London',
    localeArgument: 'en-US',
    expected: '2020-01-01T00:00:00',
  },
  {
    date: new Date(2020, 0, 1, 0, 0, 0, 0),
    timeZone: 'Europe/London',
    localeArgument: 'uk-UA',
    expected: '2020-01-01T00:00:00',
  },
  {
    date: new Date(2020, 0, 1, 0, 0, 0, 0),
    timeZone: 'Europe/London',
    localeArgument: 'lt-LT',
    expected: '2020-01-01T00:00:00',
  },
];

describe('toISOStringWithTimezone', () => {
  it.each(testCases)(
    'should return date string: %s for date: %s and timezone %s',
    ({ expected, date, localeArgument, timeZone }) => {
      date.toLocaleString(localeArgument, { timeZone });
      expect(toISOStringWithTimezone(date)).toContain(expected);
    }
  );
});
