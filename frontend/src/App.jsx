import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Root from './Root'
import HumanResourceEmployee from './pages/humanResource/HumanResourceEmployee'
import Login from './pages/login/Login'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import ErrorPage from './pages/ERROR_PAGE/ErrorPage'
import RegularizationRequest from './pages/regularizationRequest/RegularizationRequest'
import AssetsAllotted from './pages/assetAllotment/AssetsAllotted'
import ViewMonthlyAttendance from './pages/viewMonthlyAttendance/ViewMonthlyAttendance'
import LeaveApplication from './pages/leaveApplication/LeaveApplication'
import PlaceOrderLunch from './pages/placeLunchOrder/PlaceOrderLunch'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <ErrorPage />
    },

    {
      path: '/login',
      element: <Login />
    }
    ,
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element:
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
        },
        {
          path: "/employeedetails",
          element:
            <ProtectedRoute>
              <HumanResourceEmployee />
            </ProtectedRoute>
        },
        {
          path: '/regularizeattendancerequest',
          element:
            <ProtectedRoute>
              <RegularizationRequest />
            </ProtectedRoute>
        },
        {
          path: '/assetsallottedtome',
          element:
            <ProtectedRoute>
              <AssetsAllotted />
            </ProtectedRoute>
        },
        {
          path: '/biometricattendance',
          element:
            <ProtectedRoute>
              <ViewMonthlyAttendance />
            </ProtectedRoute>
        },
        {
          path: '/leaveapplication',
          element:
            <ProtectedRoute>
              <LeaveApplication />
            </ProtectedRoute>
        },
        {
          path: '/placelunchorder',
          element:
            <ProtectedRoute>
              <PlaceOrderLunch />
            </ProtectedRoute>
        }
      ]
    }
  ])
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div className='bg-[#E4EAFF] h-[100vh] overflow-x-hidden'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App