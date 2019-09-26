export default [
  {
    name: 'shortDaysOfWeek',
    handler(value) {
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      return daysOfWeek[value].substr(0, 3);
    },
  },
  {
    name: 'kelvinsToCelsius',
    handler(value) {
      return `${Math.round(value - 273.15)}`;
    },
  },
];
