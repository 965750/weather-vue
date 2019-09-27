import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import SunVisual from '@/components/SunVisual.vue';
import filters from '@/myFilters';

const localVue = createLocalVue();

filters.forEach((filter) => {
  localVue.filter(filter.name, filter.handler);
});

const initialProps = {
  clouds: 5,
  rain: {},
};

describe('SunVisual.vue', () => {
  const createWrapper = (props = initialProps) => shallowMount(SunVisual, {
    localVue,
    propsData: {
      ...props,
    },
    stubs: {
      'font-awesome-icon': true,
    },
  });

  it('should match initial snapshot', () => {
    const wrapper = createWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot when it is raining and cloudy', () => {
    const wrapper = createWrapper({
      clouds: 90,
      rain: {
        hourly: 5,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
