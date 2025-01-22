import React from 'react'
import "./App.css"
import { Button } from './components/ui/button'
import AppLayout from './components/App-Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding'
import JobListing from './pages/Job-listing'
import Job from './pages/job'
import JobPage from './pages/JobPage'
import MyJobs from './pages/My-Jobs'
import PostJob from './pages/Post-Job'
import SavedJobs from './pages/Saved-Jobs'
import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from './components/protected-route'

const router = createBrowserRouter([
  {
    element:<AppLayout/>,//it tells where it will render
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/onboarding",
        element:(
          <ProtectedRoute>
        <Onboarding/>
        </ProtectedRoute>
        ),
      },
      {
        path:"/jobListing",
        element:(
          <ProtectedRoute>
        <JobListing/>
        </ProtectedRoute>
        ),
      },
      {
        path:"/job/:id",
        element:(
          <ProtectedRoute>
        <job/>
        </ProtectedRoute>
        ),
      },
      {
        path: "/job",
        element:(
          <ProtectedRoute>
        <Job />
        </ProtectedRoute>
      ),
      },
      {
        path:"/jobpage",
        element:(
          <ProtectedRoute>
        <JobPage/>
        </ProtectedRoute>
        ),
      },
      {
        path:"/postjob",
        element:(
        <ProtectedRoute>
        <PostJob/>
        </ProtectedRoute>
      ),
      },
      {
        path:"/saved-jobs",
        element:
        (
          <ProtectedRoute>
        <SavedJobs/>
        </ProtectedRoute>
        ),
      },
      {
        path:"/my-jobs",
        element:(
          <ProtectedRoute>
        <MyJobs/>
        </ProtectedRoute>
        ),
      },
    ]
  }
])

export default function App() {
  return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
 <RouterProvider router={router} />
  </ThemeProvider>
  )
}
