import { useSelector } from 'react-redux';

const Books = () => {
  const book = useSelector((state) => state.isbnReducer);

  return <p>{book.status ? book.result.title : null}</p>;
};

export default Books;
