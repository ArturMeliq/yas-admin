import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout/Layout';
import Login from './pages/login/Login';
import Businesses from './pages/businesses/Businesses';
import BusinessesCreate from './pages/businesses/businessesCreate/BusinessesCreate';
import 'react-toastify/dist/ReactToastify.css';
import WaitingVerification from './pages/businesses/WaitingVerification/WaitingVerification';
import SingleBusiness
  from './pages/businesses/singleBusiness/SingleBusiness';
import DeletedBusiness from './pages/businesses/deletedBusiness/DeletedBusiness';
import DeletedTheReview from './pages/businesses/deletedTheReview/DeletedTheReview';
import ReportedTheReview from './pages/businesses/reportedTheReview/ReportedTheReview';
import DeletedUsers from './pages/businesses/deletedUsers/DeletedUsers';
import SingleBusinessPersonInformation
  from './pages/businesses/singleBusinesPersonInformation/SingleBusinessPersonInformation';
import CategoryList from './pages/businesses/categoryList/CategoryList';
import Statistics from './pages/statistics/Statistics';
import RegisteredUsers from './pages/businesses/registeredUsers/RegisteredUsers';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="businesses">
            <Route index element={<Navigate replace to="list" />} />
            <Route path="list" element={<Businesses />} />
            <Route path=":type/:id" element={<SingleBusinessPersonInformation />} />
            <Route path="waiting-verification" element={<WaitingVerification />} />
            <Route path="waiting-verification/:id" element={<SingleBusiness />} />
            <Route path="delete-list" element={<DeletedBusiness />} />
            <Route path="delete-list/:id" element={<SingleBusiness />} />
            <Route path="deleted-review" element={<DeletedTheReview />} />
            <Route path="reported-review" element={<ReportedTheReview />} />
            <Route path="registered-users" element={<RegisteredUsers />} />
            <Route path="deleted-users" element={<DeletedUsers />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="create" element={<BusinessesCreate />} />
            <Route path="update" element={<BusinessesCreate />} />
          </Route>
          <Route path="statistics">
            <Route path=":type" element={<Statistics />} />
          </Route>
          <Route
            path="*"
            element={(
              <div style={
            {
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 50,
            }
}
              >
                404
              </div>
)}
          />
        </Route>
      </Routes>
    </BrowserRouter>

    <ToastContainer />
  </>
);

export default App;
