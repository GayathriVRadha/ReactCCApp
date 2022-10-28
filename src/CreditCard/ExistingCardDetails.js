
import React from "react";
import {useState, useEffect} from 'react';
import styled from "styled-components";

const ExistingCardContainer = styled.div`
  margin: 1rem;
`;
const ExistingCardMain = styled.table`
width: 75%;
th,tr,td{
  padding : 10px;
  border-bottom : 1px solid black;
  text-align:center;
}
th{
  background-color:#f0f0f0
}
`;
function ExistingCardDetails(props) {

  const [existingCards, displayAllCardDetails] = useState([]);
  useEffect(()=>{
    const xhr = new XMLHttpRequest();
  
  xhr.open('GET', 'http://localhost:8080/api/getAllCCDetails');

  xhr.responseType = 'json';
  xhr.onload = function() {
    const response = xhr.response;
    displayAllCardDetails(response);
  console.log("useEffect called");  
  }
  xhr.send();
  },[props.newcardAdded]);

  return (
      <ExistingCardContainer>
        <div>
        <ExistingCardMain>
        <tr><th>Name</th><th>Card Number</th><th>Balance</th><th>Limit</th></tr>
        {existingCards.map((card)=> 
        <tr>
          <td>{card.customerName}</td>
          <td>{card.creditCardNumber}</td>
          <td>€{card.initBalance}</td>
          <td>€{card.creditCardlimit}</td>
        </tr>)}
        </ExistingCardMain>
      </div>
      </ExistingCardContainer>
  );
}

export default ExistingCardDetails;
