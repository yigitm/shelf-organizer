import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBook } from '../redux/ISBN/isbn';

const Books = () => {
  const book = useSelector((state) => state.isbnReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (book.status === undefined) dispatch(getBook);
  });

  return (
    <div>
      <h1>{book.status ? book.result.title : null}</h1>
      <h1>{book.status ? book.result.author : null}</h1>
    </div>
  );
};

export default Books;
