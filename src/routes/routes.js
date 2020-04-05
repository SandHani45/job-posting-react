import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Router = (props) => {
    const { routes, defaultRoute } = props;
    return (
        <Switch>
            {routes.map((route, index) => {
                const { component: RouteComponent, routes, exact, path } = route;
                return <Route
                    exact={exact}
                    key={index}
                    path={path}
                    render={() => <RouteComponent {...props} routes={routes} />} />;
            })}
            <Redirect to={defaultRoute} />
        </Switch>
    );
};
