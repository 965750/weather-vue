export default [
  {
    name: 'shortDaysOfWeek',
    handler(value) {
      console.log(value, 344444);
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

      return daysOfWeek[value].substr(0, 3);
    },
  },
];
