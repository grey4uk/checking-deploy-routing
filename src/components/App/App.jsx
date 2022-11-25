import { lazy, Suspense } from 'react';
import { Routes, Route,Outlet } from 'react-router-dom';
import useRefreshCurrentUser from 'hooks/useRefreshCurrentUser';
import AppBar from 'components/AppBar';
import NotFound from 'components/NotFound';
import PublicRoute from 'components/PublicRoute';
import Loader from 'components/Loader';
import Footer from 'components/Footer';
import PrivateRoute from 'components/PrivateRoute';

const HomePage = lazy(() => import('pages/HomePage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));
const AddContactPage = lazy(() => import('pages/AddContactPage'));
const ChangeContactPage = lazy(() => import('pages/ChangeContactPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));

function App() {
  const { isRefreshing } = useRefreshCurrentUser();  
  return (
    <>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <>
          {!isRefreshing && (
            <Routes>
              <Route path='/' element={<Outlet/>}>

              <Route
                index
                element={
                  <PublicRoute>
                    <HomePage />
                  </PublicRoute>
                }
              />
              <Route path="contacts" element={<PrivateRoute>
                <ContactsPage />
                </PrivateRoute>
                } />
              <Route
                path="contacts/add"
                element={
                  <PrivateRoute>
                    <AddContactPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="contacts/edit/:contactId"
                element={
                  <PrivateRoute>
                    <ChangeContactPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="register"
                element={
                  <PublicRoute restricted>
                    <RegisterPage />
                  </PublicRoute>
                }
              />
              <Route
                path="login"
                element={
                  <PublicRoute restricted>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="*"
                element={
                  <PublicRoute>
                    <NotFound />
                  </PublicRoute>
                }
              />
              </Route>
            </Routes>
          )}
        </>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;