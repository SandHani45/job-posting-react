import React, {useContext} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// context
import { GlobalContext } from "./../context/GlobalState";

export const Router = (props) => {
    const { routes, defaultRoute } = props;
    const { keyData } = useContext(GlobalContext);
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
