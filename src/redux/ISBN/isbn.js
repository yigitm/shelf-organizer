import { act } from '@testing-library/react';

const GET_BOOK = 'shelf-organizer/ISBN/isbn/GET_BOOK';
const baseURL = 'https://api.orhanaydogdu.com.tr/isbn/index.php?isbn=';
let initialState = [];
let isbn = '';

export const setIsbn = (barcode) => {
  isbn = barcode;
};

export const getBook = async (dispatch) => {
  const response = await fetch(baseURL + isbn);
  const data = await response.json();
  dispatch({ type: GET_BOOK, payload: data });
};

const isbnReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK:
      return Object.assign(action.payload);
    default:
      return state;
  }
};

export default isbnReducer;
