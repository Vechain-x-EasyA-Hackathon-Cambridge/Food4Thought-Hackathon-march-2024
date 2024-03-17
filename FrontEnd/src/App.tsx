import './App.css'
import {
  createBrowserRouter,
  Link,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import React from 'react';
import {Typography, Button, styled, Paper, ButtonBase} from '@mui/material';
import Connex from '@vechain/connex';
import {Transaction} from 'thor-devkit';
import { LinkCustom, SellerListing } from './pages/SellerListing';
import { SellerPage } from './pages/SellerPage';
// import { abi } from 'thor-devkit';
import bannerImgSrc from './assets/banner.jpg'

// connex.thor.transaction().get()

// window.devKit = {Transaction};
// window.abi = abi;
// const someFn = new abi.Function();

// const connex = new Connex({
//   node: 'https://mainnet.veblocks.net/',
//   network: 'test',
//   signer: 'sync'
// })

const ImgContainer = styled("div")`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #eee;
  border-top: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
`;

const connex = new Connex({
  node: 'https://testnet.veblocks.net',
  network: 'test',
});


async function itererateBlockChain(block: Connex.Thor.Block | null, fn: (block: Connex.Thor.Block | null) => void){
  // const best = await connex.thor.block().get();
  fn(block);
  
  const parentId = block?.parentID;
  if(parentId){
    const parentBlock = await connex.thor.block(parentId).get();
    return itererateBlockChain(parentBlock, fn);
  }
  // best?.parentID
}

window.itererateBlockChain = itererateBlockChain;
window.connex = connex;

const connectWallet = async () => {
  // Remember: You can swap this node out for any other available one.
  // Check out the full list at:https://nodes.status.vechain.energy/


  const certificate = await connex.vendor.sign(
    'cert',
    {
      purpose: 'identification',
      payload: {
        type: 'text',
        content: 'Please sign this certificate to log in',
      },
    },
  ).request();

  // Update our state so the user knows they're connected successfully!
  // setUserAddress(wallet.annex.signer);
  // setConnected(true);
  console.log("wallet", certificate);
  // const [wallet] = certificate;


  

  return {connected: true, useAddress: certificate.annex.signer};
};

window.connectWallet = connectWallet;

const best = await connex.thor.genesis;//. .block().get();
best?.txsRoot

async function authenticate(){

  // read best block
  const best = await connex.thor.block().get()
  // sign a transaction
  const res = await connex.vendor.sign('tx', [{
    to: '0x...',
    value: 0x0,
    data: '0x...'
  }]).request()
  // composed by thor and vendor
  const {thor, vendor} = connex

  return {thor, vendor};
}








function LandingPage(){
  return (
    <div>
      <div>

        <Paper style={{padding: '20px'}}>
          <Typography variant="h4">Food 4 Thought</Typography>
          <Typography variant="button">Responsibly sourced food</Typography>
          <Typography>Better food for the future</Typography>
        </Paper>
        <ImgContainer>
          <img src={bannerImgSrc}/>
        </ImgContainer>
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

const HeaderButton = styled(Button)`
  color: white;
`;


class Root extends React.Component {
  render(){
    return (
      <div>
        
        <HeaderBarContainer>
          <Typography fontWeight="bold" variant='button'>Food 4 Thought</Typography>
          <LinkCustom to="/">
            <HeaderButton>Home</HeaderButton>
          </LinkCustom>
          {/* <LinkCustom to="other">
            <HeaderButton>Other page</HeaderButton>
          </LinkCustom> */}
          <LinkCustom to="sellers">
            <HeaderButton>Sellers</HeaderButton>
          </LinkCustom>
          <div style={{flexGrow: 1}}/>
          <ButtonBase onClick={() => connectWallet()}>
            <HeaderButton>Sign In</HeaderButton>
          </ButtonBase>
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
        path: "",
        element: <LandingPage />,
      },
      {
        path: "other",
        element: (<div>Other page</div>),
      },
      {
        path: "sellers",
        element: <SellerListing/>,
      },
      {
        path: "seller/:id",
        element: <SellerPage/>,
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
