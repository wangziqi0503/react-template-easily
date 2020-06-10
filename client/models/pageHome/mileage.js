export default {
    namespace: 'mileage',
    state: {
        isShow: false
    },
    effects: {
        *getTopBanHeight({ payload }, { call, put }) {
            yield put({ type: 'setTopBanHeight', payload: payload })
        }
    },
    reducers: {
        setMileageStatus(state, { payload }) {
            return {
                ...state,
                isShow: payload
            }
        }
    }
}
