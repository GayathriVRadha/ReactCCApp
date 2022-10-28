import { useState, useEffect } from "react";
import styled from "styled-components";
const AddCardForm = styled.div`
  form label {
    text-align: left;
  }
  input {
    margin-bottom: 20px;
    width: 25%;
    padding: 10px;
    display: block;
    border: 1px solid black;
  }
  button {
    padding: 10px;
    border-radius: 10px;
    span {
      margin: 2rem;
    }
  }
`;
const ErrorDetail = styled.div`
color:red;
font-size:12px;
font-weight:500;
padding:5px;
margin-bottom:5px;
`;
const SuccessMsg = styled.div`
color:green;
font-size:12px;
font-weight:500;
padding:5px;
margin-bottom:5px;
`;

function AddCardDetails(props) {
  const [errMsg, updateErrorMsg] = useState('');
  const [successMsg, updatesuccessMsg] = useState('');
  const [cardDetails, updateCardDetails] = useState({
    customerName: "",
    creditCardNumber: "",
    creditCardlimit: "",
    initBalance: 0,
  });

   async function triggerAddCardApi(cardDetails) {
    updateErrorMsg("");
    const body = JSON.stringify({
      customerName: cardDetails.customerName,
      creditCardNumber: cardDetails.creditCardNumber,
      creditCardlimit: cardDetails.creditCardlimit,
      initBalance: 0
    });
    const xhr = new XMLHttpRequest();
    
    xhr.open("POST", "http://localhost:8080/api/addCCDetails");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader('Access-Control-Allow-Origin',  'http://localhost:8080/api/addCCDetails');
    xhr.responseType = "json";

    xhr.onload = function () {
      const response = xhr.response;
      props.addedNewCard(true);
      // response.successMsg="Added successfully"; 
      // if(response && response.error)
      // {
      //   updateErrorMsg(response.error);
      // }
       if(response){
        updatesuccessMsg("Added Successfully");
        updateErrorMsg(" ");
      }
      else if(response && response.error)
      {
        updatesuccessMsg(" ");
        updateErrorMsg(response.error);
      }
      else{
        updatesuccessMsg(" ");
        updateErrorMsg("Please Enter Valid Card Details");
      }
    };
    xhr.send(body);
  };

  const validateForm = (event) => {
    event.preventDefault();
    if(cardDetails?.customerName && cardDetails?.creditCardNumber?.length <= 19 && cardDetails?.creditCardlimit)
    {
    triggerAddCardApi(cardDetails);
    }
    else{
      updatesuccessMsg(" ");
      updateErrorMsg("Please enter all the details");
    }
  };
  const updateName = (name) => {
    updateCardDetails((prevState) => {
      return { ...prevState, customerName: name.target.value };
    });
  };
  const updateCard = (card) => {
    updateCardDetails((prevState) => {
      return { ...prevState, creditCardNumber: card.target.value };
    });
  };
  const validateCardNumber=(card)=>{
    if(isNaN(card?.target?.value))
    {
      updatesuccessMsg(" ");
      updateErrorMsg("Enter only numeric values");
    }
    if(card?.target?.value?.length>19){
      updatesuccessMsg(" ");
      updateErrorMsg("Card Number should not exceed 19 digits");
    }
    else{
      updatesuccessMsg(" ");
      updateErrorMsg("");
    }
  }
  const updateLimit = (limit) => {
    updateCardDetails((prevState) => {
      return { ...prevState, creditCardlimit: limit.target.value };
    });
  };
  return (
    <AddCardForm>
      <form onSubmit={validateForm}>
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Albert Einstein"
          value={cardDetails.customerName}
          onChange={updateName}
        ></input>
        <label for="card">Card number</label>
        <input
          id="card"
          type="number"
          placeholder="Card number"
          value={cardDetails.creditCardNumber} 
          onChange={updateCard}
          onBlur={validateCardNumber}
        ></input>
        <label for="limit">Limit</label>
        <input
          id="limit"
          placeholder="3000"
          type="number"
          value={cardDetails.creditCardlimit}
          onChange={updateLimit}
        ></input>
        <ErrorDetail>{errMsg}</ErrorDetail>
        <SuccessMsg>{successMsg}</SuccessMsg>
        <button type="submit">
          <span>Add</span>
        </button>
      </form>
    </AddCardForm>
  );
}

export default AddCardDetails;
