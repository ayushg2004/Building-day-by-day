// import { useState } from "react";
// import "../styles/index.css";

// const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState("");

//   return (
//     <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Search products..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={() => query.trim() && onSearch(query)}>Search</button>
//     </div>
//   );
// };

// export default SearchBar;

import { useState } from "react";
import "../styles/index.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // ✅ New: Submit handler for form
  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    // ✅ Changed: Wrapped input & button in a <form> with onSubmit
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* ✅ Changed: type="submit" to trigger form submission with Enter */}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
