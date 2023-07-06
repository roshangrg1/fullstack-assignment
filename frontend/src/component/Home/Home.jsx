import React from "react";
import BookCard from "./BookCard";
import MetaData from "../layout/MetaData";


const book ={
    name:" Think and grow rich",
    photos: [{url:"https://th.bing.com/th/id/R.068f8744ba043b46a14d30ebf026e92f?rik=J4NeRZc%2fIAPwLg&pid=ImgRaw&r=0"}],
    price: "300",
    _id:1 ,
    description: 'writer suffering from a bad case of writer’s block when ',
    category: "Novel"

}
const Home = () => {
  return (
    
    <div className="home">
      <MetaData title="Ecommerce"/>
      {/* banner */}
      <div className=" py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className=" text-center">
            <h1 className="text-[40px] font-bold mb-2 ">Welcome to Bookify</h1>
            <p className="text-lg mb-4 mt-[35px]">
              Discover a world of books and indulge in your passion for reading.
            </p>
          </div>
        </div>
      </div>

      {/* heading */}
      <h2 class="flex flex-row flex-nowrap items-center my-8 ">
        <span
          class="flex-grow block border-t border-black"
          aria-hidden="true"
          role="presentation"
        ></span>
        <span class="flex-none block mx-4 text-[20px]   px-4 py-2.5 text-xs leading-none font-medium uppercase bg-gray-900 text-white">
          Featured Books
        </span>
        <span
          class="flex-grow block border-t border-black"
          aria-hidden="true"
          role="presentation"
        ></span>
      </h2>

      <div className="container flex flex-wrap gap-[20px] mx-[auto] px-[5%]" id="container" >
            <BookCard book={book}/>
            <BookCard book={book}/>
            <BookCard book={book}/>
            <BookCard book={book}/>
            <BookCard book={book}/>
      </div>
    </div>
  );
};

export default Home;
