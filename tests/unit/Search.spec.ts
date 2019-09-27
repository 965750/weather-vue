import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import Search from '@/components/Search.vue';
import filters from '@/myFilters';
import store from '@/store';
import messages from '@/locale/languages';

const localVue = createLocalVue();
localVue.use(VueI18n);

const initialStore = {
  getters: {
    getError: () => 'We could not find this city name',
  },
  actions: {
    citySearch: jest.fn(),
  },
};

const i18n = new VueI18n({
  locale: store.getters.getLanguage,
  messages,
});

filters.forEach((filter) => {
  localVue.filter(filter.name, filter.handler);
});

describe('Search.vue', () => {
  const createWrapper = (mockStore = initialStore) => shallowMount(Search, {
    store: new Vuex.Store(mockStore),
    i18n,
    localVue,
  });

  it('should match initial snapshot', () => {
    const wrapper = createWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match snapshot without error notification', () => {
    const wrapper = createWrapper({
      ...initialStore,
      getters: {
        getError: () => null,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should match make dispatch on submit click', () => {
    const wrapper = createWrapper();

    const input = wrapper.find('#searchField');
    const form = wrapper.find('#searchForm');

    input.element['_value'] = 'karpacz';
    form.trigger('submit');

    expect(initialStore.actions.citySearch).toHaveBeenCalled();
  });
});
