import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import TimePeriods from '@/components/TimePeriods.vue';
import filters from '@/myFilters';
import store from '@/store';
import messages from '@/locale/languages';

const localVue = createLocalVue();
localVue.use(VueI18n);

const i18n = new VueI18n({
  locale: store.getters.getLanguage,
  messages,
});

filters.forEach((filter) => {
  localVue.filter(filter.name, filter.handler);
});

const initialProps = {
  periods: [
    {
      main: {
        temp: 22,
      },
      time: 168999000,
    },
    {
      main: {
        temp: 24,
      },
      time: 168991000,
    },
  ],
};

describe('TimePeriods.vue', () => {
  const createWrapper = (props = initialProps) => shallowMount(TimePeriods, {
    i18n,
    localVue,
    propsData: {
      ...props,
    },
    stubs: {
      'v-col': true,
      'v-row': true,
    },
  });

  it('should match initial snapshot with valid hour format', () => {
    const wrapper = createWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });
});
