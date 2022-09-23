import React from 'react';

// Layout
import { LayoutOther } from '../components/Layout';

// Page
const Home = React.lazy(() => import('../page/Home'));
const Test = React.lazy(() => import('../page/Test'));
const TodoList = React.lazy(() => import('../page/TodoList'));
const Login = React.lazy(() => import('../components/Login/Login'));

interface Router {
  path: string;
  name: string;
  component: any;
  exact?: boolean;
  layout?: any;
}

interface Routes {
  publicRouters: Router[];
  privateRouters: Router[];
}

let routes: Routes;

let publicRouters: Router[] = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login,layout:null },
  {
    path: '/testLayout',
    name: 'Test Layout',
    component: Test,
    layout: LayoutOther,
  },
];
let privateRouters: Router[] = [
  { path: '/todo', name: 'To Do List', component: TodoList },
];
routes = {
  publicRouters,
  privateRouters,
};

export default routes;
