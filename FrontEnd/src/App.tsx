import './App.css'
import {
  createBrowserRouter,
  Link,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React from 'react';
import {Typography, Button, styled} from '@mui/material';

function LandingPage(){
  return (
    <div>
      <div>
        <Typography>The Landing page</Typography>
      </div>
    </div>
  );
}

const HeaderBarContainer = styled('div')`
  display: flex;
  background: #57ff57;
  align-items: center;
  color: white;
  padding: 12px 8px;
`;


class Root extends React.Component {
  render(){
    return (
      <div>
        
        <HeaderBarContainer>
          <Typography>Header Bar</Typography>
          <Link to="landing">
            <Button>Landing page</Button>
          </Link>
          <Link to="other">
            <Button>Other page</Button>
          </Link>
        </HeaderBarContainer> 
        
        <Outlet/>
       </div>
    );
  }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "landing",
        element: <LandingPage />,
      },
      {
        path: "other",
        element: (<div>Other page</div>),
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
