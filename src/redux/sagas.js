// src/redux/sagas.js
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchWeatherRequest,
} from "./weatherSlice";

const YOUR_API_KEY = "23cefd33f9d8ef69d282837a0db3981e";

function* fetchWeatherSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `https://api.openweathermap.org/data/2.5/weather?q=${action.payload}&appid=${YOUR_API_KEY}`
    );
    yield put(fetchWeatherSuccess(response.data));
  } catch (error) {
    yield put(fetchWeatherFailure(error.message));
  }
}

function* watchFetchWeather() {
  yield takeEvery(fetchWeatherRequest.type, fetchWeatherSaga);
}

export default function* rootSaga() {
  yield watchFetchWeather();
}
