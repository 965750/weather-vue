import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import store from '@/store';
import messages from '@/locale/languages';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueI18n);

const i18n = new VueI18n({
  locale: store.getters.getLanguage,
  messages,
});

const initialStore = {
  getters: {
    getLanguage: () => 'en',
  },
};

describe('LanguageSwitcher.vue', () => {
  const createWrapper = (mockStore = initialStore) => shallowMount(LanguageSwitcher, {
    store: new Vuex.Store(mockStore),
    i18n,
    localVue,
    stubs: {
      'font-awesome-icon': true,
    },
  });

  it('should match initial snapshot', () => {
    const wrapper = createWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should swap active button', () => {
    const wrapper = createWrapper({
      getters: {
        getLanguage: () => 'pl',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should change current lang on click', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm['_data'].lang).toBe('en');

    const btnNotActive = wrapper.find('.lang__btn');
    btnNotActive.trigger('click');

    expect(wrapper.vm['_data'].lang).toBe('pl');
  });
});
