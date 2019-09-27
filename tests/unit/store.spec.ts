import mutations from '@/mutations';
import getters from '@/getters';

const weatherData = {
  city: {
    name: 'Karpacz',
    country: 'PL',
  },
  list: [
    {
      clouds: {
        all: 30,
      },
      dt: 1670000,
      wind: {
        speed: 10,
      },
      rain: 2,
      main: {
        humidity: 12,
        temp: 289,
        temp_min: 277,
        temp_max: 299,
      },
    },
  ],
};

const weatherList = [{
  clouds: 30,
  main: {
    humidity: 12,
    temp: 289,
    temp_max: 299,
    temp_min: 277,
  },
  rain: 2,
  time: 1670000,
  wind: 10,
}];

describe('store', () => {
  let state;

  beforeEach(() => {
    state = {
      error: null,
      card: null,
      lang: 'pl',
    };
  });

  it('should set error on setCard__Error', () => {
    mutations.setCard__Error(state);

    expect(state.error).toBe('We could not find this city name');
  });

  it('should set card on setLanguage', () => {
    const language = 'en';
    mutations.setLanguage(state, language);

    expect(state.lang).toEqual(language);
  });

  it('should set card on setCard', () => {
    mutations.setCard(state, weatherData);

    expect(state.card).toEqual({
      city: {
        name: 'Karpacz',
        country: 'PL',
      },
      weatherList,
    });
  });

  it('should set card on setCard but without rain', () => {
    mutations.setCard(state, {
      ...weatherData,
      list: [
        {
          clouds: {
            all: 30,
          },
          dt: 1670000,
          wind: {
            speed: 10,
          },
          main: {
            humidity: 12,
            temp: 289,
            temp_min: 277,
            temp_max: 299,
          },
        },
      ],
    });

    expect(state.card).toEqual({
      city: {
        name: 'Karpacz',
        country: 'PL',
      },
      weatherList: [{
        clouds: 30,
        main: {
          humidity: 12,
          temp: 289,
          temp_max: 299,
          temp_min: 277,
        },
        rain: null,
        time: 1670000,
        wind: 10,
      }],
    });
  });

  it('should return card object', () => {
    mutations.setCard(state, weatherData);

    expect(getters.getCard(state)).toEqual({
      city: {
        name: 'Karpacz',
        country: 'PL',
      },
      weatherList,
    });
  });

  it('should return error', () => {
    mutations.setCard__Error(state);

    expect(getters.getError(state)).toEqual('We could not find this city name');
  });

  it('should return site language', () => {
    expect(getters.getLanguage(state)).toEqual('pl');
  });
});
