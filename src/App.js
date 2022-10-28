import "./TitlePage.css";
import React from "react";
import {useState} from 'react';
import AddCardDetails from "./CreditCard/AddCard";
import ExistingCardDetails from "./CreditCard/ExistingCardDetails";
import styled from "styled-components";

const CreditCardSystem = styled.div`
  margin: 1rem;
`;
function App() {
   const [newcardAdded, updateStatus] = useState('');
  const addedNewCard=(value)=>{
    updateStatus(value);
    console.log("*** Add Api triggered ***",value);
  };
  return (
      <CreditCardSystem>
       <h1>Credit Card System</h1>
        <h2>Add</h2>
        <AddCardDetails addedNewCard={addedNewCard}/>
        <ExistingCardDetails newcardAdded={newcardAdded}/>
      </CreditCardSystem>
  );
}

export default App;
