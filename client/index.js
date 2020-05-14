import dva from 'dva'
import App from './app'

/** * common stylesheet file ** */
import './common/style/_reset.scss'
import './common/style/_common.scss'
// import router from './client/routes'

//初始化dva
const app = dva()

// plugins
// app.use({})

// model
// app.model(require('./models/example').default)

// route
app.router(App)

// start
app.start('#container')
