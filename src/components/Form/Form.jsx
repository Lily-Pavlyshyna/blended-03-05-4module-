import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useState } from 'react';
// const Form = ({ onSubmit }) => {
//   const [query, setQuery] = useState('');
//   const handleChange = e => {
//     setQuery(e.target.value);
//   };
//   console.log(query);
//   const handleSubmit = e => {
//     e.preventDefault();
//     if (!query.trim()) {
//       return alert('Can not be empty');
//     }
//     onSubmit(query);
//     setQuery('');
//
//   };
//   return (
//     <form className={style.form} onSubmit={handleSubmit}>
//       <button className={style.button} type="submit">
//         <FiSearch size="16px" />
//       </button>

//       <input
//         className={style.input}
//         placeholder="What do you want to write?"
//         name="search"
//         required
//         autoFocus
//         value={query}
//         onChange={handleChange}
//       />
//     </form>
//   );
// };

// export default Form;
export default function Form({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    if (value) {
      onSubmit(value);
      e.target.reset();
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
      />
    </form>
  );
}
