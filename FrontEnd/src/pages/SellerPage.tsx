import { Paper, Typography, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const SellerPageContainer = styled('div')`
  padding: 20px;
  border: 1px solid #ddd;
`;

const FieldContainer = styled('div')`

`;

export function SellerPage(){
  const pageParams = useParams();

  

  const [sellerData, setSellerData] = useState();
  useEffect(() => {
    const sellerId = pageParams.id;
    axios.post(`https://datacloudapi.nethub.co.za/v1/get/${sellerId}`, 
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

      if(resp.data) setSellerData(resp.data);
    });
  });


  return (
    <SellerPageContainer>
      {
        sellerData && 
        <>
          <Paper>
            <Typography variant="h4">{sellerData.name}</Typography>
            <p/>
          </Paper>
          
          <FieldContainer>
            <Typography fontWeight="bold">Wallet Id</Typography>
            <Typography>{sellerData.walletId}</Typography>
          </FieldContainer>
          <FieldContainer>
            <Typography fontWeight="bold">Type</Typography>
            <Typography>{sellerData.type}</Typography>
          </FieldContainer>
          <FieldContainer>
            <Typography fontWeight="bold">Vat No.</Typography>
            <Typography>{sellerData.vatNo}</Typography>
          </FieldContainer>
          <FieldContainer>
            <Typography fontWeight="bold">Address</Typography>
            <Typography>{`${sellerData.addressLine1}, ${sellerData.addressLine2}, ${sellerData.postCode}`}</Typography>
          </FieldContainer>
        </>
      }
      
    </SellerPageContainer>
  );
}