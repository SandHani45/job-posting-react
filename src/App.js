import React, {Suspense, useMemo, useContext} from 'react';
import './App.scss';
// Components
import UiHeader from './views/UiHeader'
import TopNavBar  from './views/TopNavBar';
import Timer from './views/Timer'
import Spinner from './views/Spinner'
// Routers
import { Routes, Router } from './routes';
import { useHistory, useLocation, useParams } from 'react-router-dom';
// context
import { GlobalContext } from "./context/GlobalState";
import { GlobalProvider } from './context/GlobalState';

// Antd
import { ArrowLeftOutlined  } from '@ant-design/icons';
import { Layout, Button } from 'antd';
const { Content } = Layout;

const App = () => {

    const history = useHistory();
    let location = useLocation();
    const { keyData, getKeyData, getPendingLabor,isActive, isActiveFun } = useContext(GlobalContext);
    let {id} = useParams();
    // Back Button
    const goBack = () => {
        history.goBack();
      }
    return (
        <GlobalProvider>
          <Suspense fallback={<Spinner />}> {/* Show a loader component here as a fallback*/}
          
          {location.pathname.includes('labor-review-and-posting') 
            ? <UiHeader for="supervisor" /> 
            :<><UiHeader /><TopNavBar /></>
          }
              {/* <UiHeader />
              <TopNavBar /> */}
              {/* <Timer /> */}
              <Layout className="layout">
                <Content style={{ padding: '0 50px' }} > 
                    <Router routes={Routes} defaultRoute={Routes[0].path} />
                </Content>
              </Layout>
              {location.pathname !== '/work-cell' ?
              <Layout className="layout">
                <Content style={{ padding: '0 50px' }} > 
                  <Button type="primary" className="back-button" onClick={goBack} icon={<ArrowLeftOutlined  />}>Back</Button>
                </Content>
              </Layout>
              : null}
          </Suspense>
        </GlobalProvider>
    );
};

export default App;
