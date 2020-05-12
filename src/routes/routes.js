import React, {useContext} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Breadcrumbs from './../views/Breadcrumbs'
// context
import { GlobalContext } from "./../context/GlobalState";
export const Router = (props) => {
    const { routes, defaultRoute } = props;
    const { keyData } = useContext(GlobalContext);
    return (
        <Switch>
            {routes.map((route, index) => {
                const { component: RouteComponent, exact, path } = route;
                return <Route
                    exact={exact}
                    key={index}
                    path={path}
                    render={(prop) =>{
                        const crumbs = props.routes.filter(({ path }) => prop.match.path.includes(path)).map(({ path, ...rest }) => ({
                          path: Object.keys(prop.match.params).length
                            ? Object.keys(prop.match.params).reduce(
                               (path, param) => path.replace(
                                 `:${param}`, prop.match.params[param]
                               ), path
                              )
                            : path,
                          ...rest
                        }));
                        console.log(`Generated crumbs for ${crumbs}`);
                        crumbs.map(({ title, path }) => console.log({ title, path }));
                        return <div className="p-8">
                            {/* <Breadcrumbs crumbs={crumbs} /> */}
                            <RouteComponent {...props} {...route} />
                        </div>
                        }
                    } />;
            })} 
            <Redirect to={defaultRoute} />
        </Switch>
    );
};
