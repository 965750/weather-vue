import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import VueI18n from 'vue-i18n';
import Vuex from 'vuex';
import Card from '@/components/Card.vue';
import filters from '@/myFilters';
import store from '@/store';
import messages from '@/locale/languages';

const localVue = createLocalVue();
localVue.use(VueI18n);

const initialStore = {
  getters: {
    getCard: () => ({
      city: {
        name: 'Berlin',
        country: 'de',
      },
      weatherList: [
        {
          clouds: 10,
          time: 16123124,
          wind: 4,
          rain: 2,
          main: {
            humidity: 70,
            temp: 288,
            temp_min: 282,
            temp_max: 298,
          },
        },
        {
          clouds: 11,
          time: 16123124,
          wind: 5,
          rain: 2,
          main: {
            humidity: 76,
            temp: 286,
            temp_min: 281,
            temp_max: 294,
          },
        },
      ],
    }),
  },
};

const i18n = new VueI18n({
  locale: store.getters.getLanguage,
  messages,
});

filters.forEach((filter) => {
  localVue.filter(filter.name, filter.handler);
});

describe('Card.vue', () => {
  const createWrapper = (mockStore = initialStore) => shallowMount(Card, {
    store: new Vuex.Store(mockStore),
    i18n,
    localVue,
  });

  it('should match initial snapshot', () => {
    const wrapper = createWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should update temp_min in extendedWeather', () => {
    const wrapper = createWrapper({
      getters: {
        getCard: () => ({
          city: {
            name: 'Berlin',
            country: 'de',
          },
          weatherList: [
            {
              clouds: 10,
              time: 16123124,
              wind: 4,
              rain: 2,
              main: {
                humidity: 70,
                temp: 288,
                temp_min: 282,
                temp_max: 298,
              },
            },
            {
              clouds: 11,
              time: 16123124,
              wind: 5,
              rain: 2,
              main: {
                humidity: 76,
                temp: 286,
                temp_min: 285,
                temp_max: 299,
              },
            },
          ],
        }),
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should update pass NO raid in extendedWeather', () => {
    const wrapper = createWrapper({
      getters: {
        getCard: () => ({
          city: {
            name: 'Berlin',
            country: 'de',
          },
          weatherList: [
            {
              clouds: 10,
              time: 16123124,
              wind: 4,
              rain: 0,
              main: {
                humidity: 70,
                temp: 288,
                temp_min: 282,
                temp_max: 298,
              },
            },
          ],
        }),
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should update set valid dominant value as mostCommon temp', () => {
    const wrapper = createWrapper({
      getters: {
        getCard: () => ({
          city: {
            name: 'Berlin',
            country: 'de',
          },
          weatherList: [
            {
              clouds: 10,
              time: 16123124,
              wind: 4,
              rain: 2,
              main: {
                humidity: 70,
                temp: 288,
                temp_min: 282,
                temp_max: 298,
              },
            },
            {
              clouds: 11,
              time: 16123124,
              wind: 5,
              rain: 2,
              main: {
                humidity: 76,
                temp: 288,
                temp_min: 285,
                temp_max: 299,
              },
            },
            {
              clouds: 11,
              time: 16123124,
              wind: 5,
              rain: 2,
              main: {
                humidity: 76,
                temp: 283,
                temp_min: 285,
                temp_max: 299,
              },
            },
          ],
        }),
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
