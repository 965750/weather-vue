import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import Statistics from '@/components/Statistics.vue';
import filters from '@/myFilters';

const localVue = createLocalVue();

filters.forEach((filter) => {
  localVue.filter(filter.name, filter.handler);
});

const initialProps = {
  weather: {
    mostCommon: 12,
    minTemp: 11,
    maxTemp: 15,
    clouds: 10,
    humidity: 22,
    temp: 13,
    wind: 5,
  },
};

describe('Statistics.vue', () => {
  const createWrapper = (props = initialProps) => shallowMount(Statistics, {
    localVue,
    propsData: {
      ...props,
    },
  });

  it('should match initial snapshot', () => {
    const wrapper = createWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });
});
