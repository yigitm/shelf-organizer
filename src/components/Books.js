import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBook } from '../redux/ISBN/isbn';

const Books = () => {
  const book = useSelector((state) => state.isbnReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (book.length === 0) dispatch(getBook);
  });

  return <h1>'test'</h1>;
};

export default Books;
