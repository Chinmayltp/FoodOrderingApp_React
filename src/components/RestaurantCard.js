const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = resData?.info;

  return (
    <div className='m-4 p-4 w-[250px] rounded-xl shadow-lg bg-gray-100 hover:bg-gray-200'>
      <img
        className='rounded-xl'
        alt='res-logo'
        src={
          "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
          cloudinaryImageId
        }
      />
      <h3 className='font-bold py-3 text-lg '>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>₹{costForTwo / 100} FOR TWO</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};
//Higher Order Component using restaurantcard as input
export const withPromtedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className='absolute bg-black text-white m-2 p-2 rounded-lg'>
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
