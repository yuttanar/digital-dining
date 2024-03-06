import FoodList from "@/components/FoodList";
import Footer from "@/components/Footer";
import UserProfile from "@/components/UserProfile";

const Home = () => {
  return (
    <div>
      <UserProfile />
      <FoodList />
      <Footer />
    </div>
  );
}

export default Home
