import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'dva/router'

export default class RouterView extends Component {
    render() {
        let { routes } = this.props
        let redirectArr = routes.filter((item) => item.redirect)
        let RedirectArr = redirectArr.map((item, i) => {
            return <Redirect key={i} from={item.path} to={item.redirect}></Redirect>
        })
        routes = routes.filter((item) => !item.redirect)
        return (
            <Switch>
                {routes.map((item, i) => {
                    return (
                        <Route
                            path={item.path}
                            key={i}
                            render={(props) => {
                                return <item.component {...props} children={item.children}></item.component>
                            }}
                        />
                    )
                })}
                {RedirectArr.length !== 0 && RedirectArr}
            </Switch>
        )
    }
}
