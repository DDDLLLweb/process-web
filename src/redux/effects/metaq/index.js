import { call, put } from 'redux-saga/effects'
import { API_METAQ_DATASOURCE } from '../../action/metaq'
import * as metaqService from '../../../service/metaq'

export function* doLoadMetaqData() {
    const data = yield call(metaqService.getMetaqData);
    if(data.success) {
        yield put({
          type: API_METAQ_DATASOURCE,
          payload: data.data
        });
    }
}

  