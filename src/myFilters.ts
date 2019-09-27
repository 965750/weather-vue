export default [
  {
    name: 'shortDaysOfWeek',
    handler(value: number) {
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      return daysOfWeek[value].substr(0, 3);
    },
  },
  {
    name: 'kelvinsToCelsius',
    handler(value: number) {
      return `${Math.round(value - 273.15)}`;
    },
  },
];
