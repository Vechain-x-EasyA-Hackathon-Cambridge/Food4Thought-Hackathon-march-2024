import { Paper, Typography, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const sellers = axios.post("https://datacloudapi.nethub.co.za/v1/getAll/12", 
  {
    "walletId": {},
    "vatNo": {},
    "name": {},
    "type": {},
    "addressLine1": {},
    "addressLine2": {},
    "postCode": {}
  }
);

export const LinkCustom = styled(Link)`
  color: unset;
  text-decoration: unset;
`;
const SellerListingCard = styled(Paper)`
  padding: 20px;
  border: 1px solid #ddd;
`;

export function SellerListing(){


  const [sellers, setSellers] = useState();
  useEffect(() => {
    axios.post("https://datacloudapi.nethub.co.za/v1/getAll/12", 
      {
        "id": {},
        "walletId": {},
        "vatNo": {},
        "name": {},
        "type": {},
        "addressLine1": {},
        "addressLine2": {},
        "postCode": {}
      }
    ).then(resp => {

      if(resp.data) setSellers(resp.data);
    });
  }, []);

  return <div>
    <Paper style={{padding:'20px'}}>
      <Typography variant="h4">Sellers</Typography>
      <p/>
    </Paper>
    {
      sellers?.map(s => 
        <SellerListingCard>
          <LinkCustom to={`/seller/${s.id}`}>
            <Typography>{s.name}</Typography>
          </LinkCustom>
        </SellerListingCard>
      )
    }
    
  </div>

  





}