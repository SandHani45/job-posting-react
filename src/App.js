import React, {Suspense, useContext} from 'react';
import './App.scss';
// Components
import UiHeader from './views/UiHeader'
import TopNavBar  from './views/TopNavBar';
import Spinner from './views/Spinner'
// Routers
import WorkCell from './pages/work-cell/work-cell';
import PanelShop from './pages/panel-shop/panel-shop';
import JobPosting from './pages/job-posting/job-posting';
import LaborActivity from './pages/labor-activity/labor-activity';
import LaborConfirm from './pages/labor-confirm/labor-confirm';
import ProgressTimers from './pages/progress-timers/progress-timers';
import ReviewTimer from './pages/review-timer/review-timer';
import ProgressTimeStop from './pages/progress-time-stop/progress-time-stop';
import LaborRecordComplete from './pages/labor-record-complete/labor-record-complete'
import LaborReviewAndPosting from './pages/labor-review-and-posting/labor-review-and-posting';
import LaborReviewAndPostingEdit from  './pages/labor-review-and-posting/labor-review-and-posting-edit'
import LaborReviewAndPostingView from './pages/labor-review-and-posting/labor-review-and-posting-view'
import LaborReviewAndPostingAdd from './pages/labor-review-and-posting/labor-review-and-posting-add'
import LaborTracker from './pages/labor-tracker/labor-tracker'

import { Route, Switch } from "react-router-dom";
import { useHistory, useLocation, useParams } from 'react-router-dom';
// context
import { GlobalContext } from "./context/GlobalState";
import { GlobalProvider } from './context/GlobalState';

// Antd
import { Layout, Button } from 'antd';
import BackButton from './views/BackButton';
const { Content } = Layout;




const App = () => {;
    let location = useLocation();
    const { keyData, getKeyData, getPendingLabor,isActive, isActiveFun } = useContext(GlobalContext);
    let {id} = useParams();
    return (
        <GlobalProvider>
            <Suspense fallback={<Spinner />}> {/* Show a loader component here as a fallback*/}
            
            {location.pathname.includes('labor-review-and-posting') 
              ? <UiHeader for="supervisor" /> 
              :<><UiHeader /><TopNavBar /></>
            }
                <Layout className="layout">
                  <Content style={{ padding: '0 50px' }} > 
                    
                    <Route exact path="/labor-tracker" component={LaborTracker} />
                    <Switch>
                      <Route exact path="/work-cell" component={WorkCell} />
                      <Route exact path="/" component={WorkCell} />
                      <Route exact path="/" component={PanelShop} />
                    </Switch>
                  </Content>
                </Layout>
                <BackButton />
            </Suspense>
        </GlobalProvider>
    );
};

export default App;
