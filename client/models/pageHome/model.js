import { getCarList, getAllData } from '../../api/home'

export default {
    namespace: 'homeInfo',
    state: {
        carList: [],
        allData: [],
        defaultCar: []
    },
    effects: {
        *getCarList({ payload, mainData }, { call, put }) {
            const res = yield call(getCarList)
            yield put({ type: 'saveCarList', payload: res })
            if (payload.res) {
                yield put({ type: 'saveDefaultCar', payload: payload.res })
            } else {
                let carData = {}
                res.data.forEach((item) => {
                    if (item.defaultCar === 1) {
                        carData = item
                    }
                })
                yield put({ type: 'saveDefaultCar', payload: carData })
                const { id, modelId, mileage } = carData
                const mainData = Object.assign(payload.mainData, { id, modelId, mileage })
                yield put({ type: 'getAllData', payload: mainData })
            }
        },
        *getAllData({ payload }, { call, put }) {
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
