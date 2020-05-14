import dva from 'dva'
import App from './app'

import './common/utils/Common.jsx'
/** * common stylesheet file ** */
import './common/style/_reset.scss'
import './common/style/_common.scss'
// import router from './client/routes'

//初始化dva
const app = dva()

// plugins
// app.use({})

// model
app.model(require('./models/pageHome/model').default)

// route
app.router(App)

// start
app.start('#container')
