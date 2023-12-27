import { createBrowserHistory } from 'history';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chats } from './components/main';
import { NavBar, Preloader } from "./components/shared";
import * as ROUTE from "./constants/routes";
import * as pages from './pages';
import { ProtectedRoute, PublicRoute } from "./routers";
import { loginSuccess } from "./redux/action/authActions";
import { checkAuthSession } from "./services/api";
import socket from './socket/socket';
// import Chatbot from './components/main/ChatBot/ChatBot';

export const history = createBrowserHistory();

function App() {
  const [isCheckingSession, setCheckingSession] = useState(true);
  const dispatch = useDispatch();
  const isNotMobile = window.screen.width >= 800;

  useEffect(() => {
    (async () => {
      try {
        const { auth } = await checkAuthSession();
        console.log("auth", auth)
        dispatch(loginSuccess(auth));

        socket.on('connect', () => {
          socket.emit('userConnect', auth.id);
          socket.emit('userStatus', { userId: auth.id, status: 'online' });
          console.log('Client connected to socket.');
        });

        // Try to reconnect again
        socket.on('error', function () {
          socket.emit('userConnect', auth.id);
        });

        
      
        socket.on('disconnect', () => {
          // Xử lý khi người dùng thoát khỏi trang
          socket.emit('userStatus', { userId: socket.id, status: 'offline' });
        });

        setCheckingSession(false);
      } catch (e) {
        console.log('ERROR', e);
        setCheckingSession(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isCheckingSession ? (
    <Preloader />
  ) : (
    <Router history={history}>
      <main className="relative min-h-screen" style={{backgroundColor: "#f2eef2"}}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          transition={Slide}
          draggable={false}
          hideProgressBar={true}
          bodyStyle={{ paddingLeft: '15px' }}
        />
        <NavBar />
        <Switch>
          <PublicRoute path={ROUTE.REGISTER} component={pages.Register} />
          <PublicRoute path={ROUTE.LOGIN} component={pages.Login} />
          <ProtectedRoute path={ROUTE.SEARCH} component={pages.Search} />
          <Route path={ROUTE.HOME} exact render={(props) => <pages.Home key={Date.now()} {...props} />} />
          <Route path={ROUTE.WATCH} exact render={(props)=> <pages.Watch key={Date.now()} {...props} /> } />
          <ProtectedRoute path={ROUTE.POST} component={pages.Post} />
          <Route path={ROUTE.GROUP} exact render={(props)=> <pages.Group key={Date.now()} {...props} /> } />
          <Route path={ROUTE.FRIENDSHIP} render={(props)=> <pages.Friendship key={Date.now()} {...props} /> } />
          <Route path={ROUTE.RESPIRATORY} exact render={(props)=> <pages.Respiratory key={Date.now()} {...props} /> } />
          <Route path={ROUTE.REPOSITORY_GROUP} exact render={(props)=> <pages.RepositoryGroup key={Date.now()} {...props} /> } />

          <Route path={ROUTE.GROUP_DETAIL} render={(props)=> <pages.GroupDetail key={Date.now()} {...props} /> } />

          <ProtectedRoute path={ROUTE.PROFILE} component={pages.Profile} />
          <ProtectedRoute path={ROUTE.CHAT} component={pages.Chat} />
          <ProtectedRoute path={ROUTE.SUGGESTED_PEOPLE} component={pages.SuggestedPeople} />
          <Route path={ROUTE.SOCIAL_AUTH_FAILED} component={pages.SocialAuthFailed} />
          <Route component={pages.PageNotFound} />
        </Switch>
        {isNotMobile && <Chats />}
        {/* <Chatbot /> */}
      </main>
    </Router>
  );
}

export default App;
