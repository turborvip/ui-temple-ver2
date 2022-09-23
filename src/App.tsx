import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './scss/style.scss';
import routes from '../src/routers';
import Loader from './components/Loader';
import { DefaultLayout } from './components/Layout';
import PrivateRoute from './routers/PrivateRoute';

const App: FC = () => {
  // function initApp = useCallback(async () => {
  //     await
  //   },
  //   [second],
  // )

  // useEffect(() => {
  //   initApp();
  // },[])

  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.publicRouters.map((route, index) => {
            const Page = route.component;
            let Layout;
            if (route?.layout) {
              Layout = route.layout;
            }
            if (!route?.layout) {
              Layout = DefaultLayout;
            }
            if (route.layout === null) {
              Layout = React.Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <React.Suspense fallback={<Loader />}>
                    <Layout>
                      <Page />
                    </Layout>
                  </React.Suspense>
                }
              />
            );
          })}
          <Route element={<PrivateRoute path={'/todo'} />} path={'/todo'}>
            {routes.privateRouters.map((route, index) => {
              const Page = route.component;
              let Layout;
              if (route?.layout) {
                Layout = route.layout;
              }
              if (!route?.layout) {
                Layout = DefaultLayout;
              }
              if (route.layout === null) {
                Layout = React.Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <Layout>
                        <Page />
                      </Layout>
                    </React.Suspense>
                  }
                />
              );
            })}
          </Route>
          <Route element={'404'} path={'*'}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
