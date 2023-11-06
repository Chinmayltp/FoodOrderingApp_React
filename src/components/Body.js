import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/Usercontext";

const Body = () => {
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // fetching data remotely via api
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.2893144&lng=80.4604643&is-seo-homepage-enabled=true"
    );

    const json = await data.json();
    setListOfRestraunt(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // to filter out and display on UI
    setFilteredRestaurant(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  // Custom hook for showing online status
  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection;
      </h1>
    );
  const { loggedInUser, setUserName } = useContext(UserContext);
  // Conditional rendering
  return listOfRestaurants.length === 0 ? (
    // shimmer card for showing dummy cards
    <Shimmer />
  ) : (
    <div className='body'>
      <div className='filter flex'>
        <div className='search m-3 p-4'>
          <input
            type='text'
            className='border border-solid border-black'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className='px-4 m-4 py-2 bg-green-100 rounded-xl '
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>

        <div className='m-3 p-4 flex items-center'>
          <button
            className='bg-gray-200 px-4 py-2 rounded-xl'
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        {/**changing the name of user */}
        <div className='search m-4 p-4 flex items-center'>
          <label>UserName : </label>
          <input
            className='border border-black p-2 bg-gray-100'
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-wrap'>
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {/**used higher order components  */}
            {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
