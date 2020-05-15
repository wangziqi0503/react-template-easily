import { getCarList, getAllData } from '../../api/home'

export default {
    namespace: 'homeInfo',
    state: {
        carList: [],
        allData: [],
        defaultCar: []
    },
    effects: {
        *getCarList({ payload }, { call, put }) {
            const res = yield call(getCarList)
            yield put({ type: 'saveCarList', payload: res })
            if (payload) {
                yield put({ type: 'saveDefaultCar', payload: payload })
            } else {
                let carData = {}
                res.data.forEach((item) => {
                    if (item.defaultCar === 1) {
                        carData = item
                    }
                })
                yield put({ type: 'saveDefaultCar', payload: carData })
                yield put({ type: 'getAllData', payload: carData })
            }
        },
        *getAllData({ payload }, { call, put }) {
            payload.provinceCode = '111'
            payload.cityCode = '111'
            payload.areaCode = '111'
            const res = yield call(getAllData, payload)
            yield put({ type: 'saveAllData', payload: res })
        }
    },
    reducers: {
        saveCarList(state, { payload }) {
            return {
                ...state,
                carList: payload.data
            }
        },
        saveDefaultCar(state, { payload }) {
            return {
                ...state,
                defaultCar: payload
            }
        },
        saveAllData(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}
