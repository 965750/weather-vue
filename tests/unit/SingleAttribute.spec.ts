import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import SingleAttribute from '@/components/SingleAttribute.vue';
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
  icon: 'sun',
  label: 'clouds',
  value: 25,
};

describe('SingleAttribute.vue', () => {
  const createWrapper = (props = initialProps) => shallowMount(SingleAttribute, {
    i18n,
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
});
