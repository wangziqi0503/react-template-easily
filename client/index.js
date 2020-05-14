import dva from 'dva'
import App from './app'
import createLoading from 'dva-loading'
import './common/utils/Common.jsx'
/** * common stylesheet file ** */
import './common/style/_reset.scss'
import './common/style/_common.scss'
// import router from './client/routes'

//初始化dva
const app = dva()

// plugins
app.use(
    createLoading({
        globale: false,
        models: {
            order: false
        }
    })
)

// model
app.model(require('./models/pageHome/model').default)

// route
app.router(App)

// start
app.start('#container')
