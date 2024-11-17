import React from 'react'
import Head from './components/Head'
import Body from './components/Body'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import MainContainer from './components/MainContainer'
import WatchPage from './components/WatchPage'
import { Provider } from 'react-redux'
import store from './store/Stote'

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <MainContainer />,
        },
        {
          path: "/watch",
          element: <WatchPage />,
        },
      ],
    },
  ]);
  
  return (
    <div className=''>
      <Provider store={store}>

      <Head/>
      {/* <Body/> */}
      <RouterProvider router={appRouter}/>
      </Provider>
    </div>
  )
}

export default App
