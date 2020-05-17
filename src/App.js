import React, { Suspense, useContext } from 'react';
import './App.scss';
// Components
import UiHeader from './views/UiHeader';
import TopNavBar from './views/TopNavBar';
import Spinner from './views/Spinner';
// Routers
import { Routes, Router } from './routes';
import { useHistory, useLocation, useParams } from 'react-router-dom';
// context
import { GlobalContext } from './context/GlobalState';
import { GlobalProvider } from './context/GlobalState';

// Antd
import { Layout, Button } from 'antd';
import BackButton from './views/BackButton';
const { Content } = Layout;

const App = (props) => {
  let location = useLocation();
  const { keyData, getKeyData, getPendingLabor, isActive, isActiveFun } = useContext(GlobalContext);
  let { id } = useParams();
  return (
    <GlobalProvider>
      <Suspense fallback={<Spinner />}>
        {' '}
        {/* Show a loader component here as a fallback*/}
        {location.pathname.includes('labor-review-and-posting') ? (
          <UiHeader for="supervisor" />
        ) : (
          <>
            <UiHeader />
            <TopNavBar />
          </>
        )}
        <Layout className="layout">
          <Content style={{ padding: '0 50px' }}>
            <Router routes={Routes} defaultRoute={Routes[0].path} />
          </Content>
        </Layout>
        
      </Suspense>
    </GlobalProvider>
  );
};

export default App;
