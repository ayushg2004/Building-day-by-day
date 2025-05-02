import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar"; // ✅ Import Navbar
import "../styles/index.css";

// we was given already deployed backend or say what ever it conatins to use for us in this function which is used by us in this frontend we needed .
// Means to use api ,API is used in frontend only to get the data from the backend and show it in the frontend and to send the data from frontend to backend and then backend will do the task and return the response to the frontend and then frontend will show the response to the user
// and this is done by using axios library in the frontend and in the backend we use express to create the api sever and then we use mongoose to connect to the mongoDB database and then we use cors to allow the frontend to access the backend api and then we use dotenv to hide the sensitive data like mongoDB link in .env file and then we use nodemon to automatically restart the server when we make changes in the code and save it so we dont have to restart the server manually every time we make changes in the code and save it
//  API is basically a link which is used to get the data or function fullfillment from backend
// // API is used in frontend only to get the data from the backend and show it in the frontend and to send the data from frontend to backend and then backend will do the task and return the response to the frontend and then frontend will show the response to the user

// Use of API is done in frontend only without backend setup,  as API is created by backend only either backend is deployed or in local host backend that link works as API to use
// here API we are using seems to be already deployed and we are using that link to get the data from the backend and show it in the frontend and to send the data from frontend to backend and then backend will do the task and return the response to the frontend and then frontend will show the response to the user
// means  like this only bakend and frontend are deployed differently and they are connected through API link generated ba backend cors to use in frontend and in front end we put that backend API link in .env file to use it in the frontend and then we use that link in the frontend to get the data from the backend and show it in the frontend and to send the data from frontend to backend and then backend will do the task and return the response to the frontend and then frontend will show the response to the user
// and then frontend will show the response to the user
// means  like this only backend and frontend works together to make the full stack application and in this project we are using already deployed backend API link to get the data from the backend and show it in the frontend and to send the data from frontend to backend and then backend will do the task and return the response to the frontend and then frontend will show the response to the user
const API_URL = "https://dummyjson.com/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const username = localStorage.getItem("username") || "User";

  useEffect(() => {
    axios.get(API_URL).then((res) => setProducts(res.data.products));
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowWelcome(false);
  //   }, 3000); // popup hides after 3 seconds

  //   return () => clearTimeout(timer); // cleanup
  // }, []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500); // start fade out
    const hideTimer = setTimeout(() => setShowWelcome(false), 3000); // remove completely

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleSearch = (query) => {
    axios
      .get(`${API_URL}/search?q=${query}`)
      .then((res) => setProducts(res.data.products));
  };

  const handleSort = (type) => {
    setProducts(
      [...products].sort((a, b) =>
        sortOrder === "asc" ? a[type] - b[type] : b[type] - a[type]
      )
    );
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <Navbar />
      {showWelcome && (
        <div className={`welcome-popup ${fadeOut ? "fade-out" : ""}`}>
          Welcome {username}, happy to see you here!
        </div>
      )}

      <div className="container">
        <h1>Product Search</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="sort-buttons">
          <button onClick={() => handleSort("price")}>Sort by Price</button>
          <button onClick={() => handleSort("rating")}>Sort by Rating</button>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
