import React from 'react';
export const cart = {
  products: [],
  returnProducts: [],
  returnTotalAmount: 0,
  totalAmaount: 0,
  loginuserid2:null,
  shopidfo:null,
  categoryid:null,
};

export const Users = {
  loginuserid: null,
  lguserfname:null,
  lguserlname:null,
  lguseremail:null,
  lgusermname:null,
  lguserNIC:null,
  lguserAddress:null,
  lguserGender:null,
  lguserDOB:null,
  lguserTP:null,
  lguserBranch:null,
  unpshopid:null,
  moreshopid:null,
  startdate:"",
  enddate:"",
  currouteid:null,
  curRouteName:null,
  reportState:null,
  oderDescription:null,
  exploreState:false,

};

export const CartContext = React.createContext(cart);
export const UserContext = React.createContext(Users);

