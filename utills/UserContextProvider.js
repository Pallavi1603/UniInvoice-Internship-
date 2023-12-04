import React, { createContext, useReducer } from 'react';

export const UserContext = createContext();

const initialState = {
  name: '',
  shopName: '',
  email: '',
  password: '',
  phone: '',
  salonFor: "",
  location: '',
  imageArray: [],
  openTime: "",
  closeTime: "",
  shopDescription: "",

  userId: "",
  allServicesRefetch: "",
  ordersRefetch: ""

};

function reducer(state, action) {
  switch (action.type) {
    case TYPES.UpdateName:
      return { ...state, name: action.payload };

    case TYPES.UpdateShopName:
      return { ...state, shopName: action.payload };

    case TYPES.UpdateEmail:
      return { ...state, email: action.payload };

    case TYPES.UpdatePassword:
      return { ...state, password: action.payload };

    case TYPES.UpdatePhone:
      return { ...state, phone: action.payload };

    case TYPES.UpdateSalonFor:
      return { ...state, salonFor: action.payload };

    case TYPES.UpdateLocation:
      return { ...state, location: action.payload };

    case TYPES.UpdateImageArray:
      return { ...state, imageArray: action.payload };

    case TYPES.UpdateOpenTime:
      return { ...state, openTime: action.payload };

    case TYPES.UpdateCloseTime:
      return { ...state, closeTime: action.payload };

    case TYPES.UpdateShopDescription:
      return { ...state, shopDescription: action.payload };

    case TYPES.UpdateUserId:
      return { ...state, userId: action.payload };

    case TYPES.AllServicesRefetch:
      return { ...state, allServicesRefetch: action.payload };

    case TYPES.OrdersRefetch:
      return { ...state, ordersRefetch: action.payload };

    default:
      throw new Error();
  }
}

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const TYPES = {
  UpdateName: 'UpdateName',
  UpdateShopName: 'UpdateShopName',
  UpdateEmail: 'UpdateEmail',
  UpdatePassword: 'UpdatePassword',
  UpdatePhone: 'UpdatePhone',
  UpdateSalonFor: 'UpdateSalonFor',
  UpdateLocation: 'UpdateLocation',
  UpdateImageArray: 'UpdateImageArray',
  UpdateOpenTime: 'UpdateOpenTime',
  UpdateCloseTime: 'UpdateCloseTime',
  UpdateShopDescription: 'UpdateShopDescription',
  AllServicesRefetch: 'AllServicesRefetch',
  OrdersRefetch: 'OrdersRefetch',

  UpdateUserId: 'UpdateUserId',
};
