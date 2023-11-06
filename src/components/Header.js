import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/Usercontext";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  return (
    <div className='flex  justify-between  bg-pink-200  shadow-lg m-3'>
      <div className='logo-container'>
        <img
          className='w-52'
          src='data:image/png;base64,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'
          alt=''
        />
      </div>
      <div className='flex items-center px-4'>
        <ul className='flex  p-4 m-4'>
          <li className='px-4'>Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li className='px-4'>
            <Link to='/'>Home</Link>
          </li>
          <li className='px-4'>
            <Link to='/about'>About Us</Link>
          </li>
          <li className='px-4'>
            <Link to='/contact'>Contact Us</Link>
          </li>
          <li className='px-4'>
            <Link to='/grocery'>Grocery</Link>
          </li>
          <li className='px-4'>cart</li>

          <div></div>
          <button
            className='login'
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
          <li className='px-4 font-bold'>{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
