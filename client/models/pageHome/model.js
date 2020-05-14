import { getCarList } from '../../api/home'

export default {
    namespace: 'homeInfo',
    state: {
        carList: [],
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
                        console.log(item)
                        carData = item
                    }
                })
                yield put({ type: 'saveDefaultCar', payload: carData })
            }
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
        }
    }
}
