import filters from '@/myFilters';

describe('myFilters.ts', () => {
  it('should shorten day of weeks by index of day', () => {
    expect(filters[0].handler(2)).toBe('Wed');
  });

  it('should change kelvins to celsius', () => {
    expect(filters[1].handler(295)).toBe('22');
  });
});
