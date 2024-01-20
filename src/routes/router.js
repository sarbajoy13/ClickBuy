import LandingPage from "../components/LandingPage/LandingPage";
import Advertisements from "../containers/Advertisements/advertisements";
import Checkout from "../containers/Checkout/checkout";
import Home from "../containers/Home/Home";
import Login from "../containers/Login/login";
import ProductDetails from "../containers/ProductDetails/productDetails";
import Aboutus from "../containers/Aboutus/Aboutus";
import Contactus from "../containers/Contactus/Contactus";
import HomePage from "../containers/HomePage/HomePage";
import SignUp from "../containers/Signup/Signup";
import Logout from "../components/Logout/logout";
import { routes } from "./routes";
import PendingProductDetails from "../containers/Home/PendingProducts/PendingProductDetails";
import ViewUsers from "../containers/Home/Users/ViewUsers";
import Profile from "../containers/Profile/profile";
import Orders from "../containers/Orders/orders";
import Revenue from "../containers/SellerRevenue/Revenue";
import Chats from "../containers/Chats/Chats";
const router = [
  {
    path: routes.landing,
    name: "Landing",
    component: LandingPage,
  },
 
  {
    path: routes.login,
    name: "Login",
    component: Login,
  },
  {
    path: routes.signup,
    name: "Sign Up",
    component: SignUp,
  },
 
    {
    path: routes.homepage,
    name: "HomePage",
    component: HomePage,
  },
     {
    path: routes.aboutus,
    name: "Aboutus",
    component: Aboutus,
  },
     {
    path: routes.contactus,
    name: "Contactus",
    component: Contactus,
  },

  {
    path: routes.profile,
    name: "User Profile",
    component: Profile,
  },
  {
    path: routes.home,
    name: "Home",
    component: Home,
  },
  {
    path: routes.checkout,
    name: "Checkout",
    component: Checkout,
  },
  {
    path: routes.orders,
    name: "Orders",
    component: Orders,
  },
  {
    path: routes.productDetails,
    name: "Product Details",
    component: ProductDetails,
  },
  {
    path: routes.ads,
    name: "Advertisements",
    component: Advertisements,
  },
  {
    path: routes.pendingproductdetails,
    name: "PendingProductDetails",
    component: PendingProductDetails,
  },
  {
    path: routes.logout,
    name: "Logout",
    component: Logout,
  },
  {
    path: routes.users,
    name: "ViewUsers",
    component: ViewUsers,
  },
  {
    path: routes.revenue,
    name: "Revenue",
    component: Revenue,
  },
  {
    path: routes.chats,
    name: "Chats",
    component: Chats,
  },
];

export default router;
