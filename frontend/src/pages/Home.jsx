import NavBar from "../components/NavBar";
import Center from "../components/Center";
import Features from "../components/Features";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Foooter";
import Plan from "../components/Plan";

function Home() {
  return (
    <div className="min-h-screen w-full px-[10%] py-1 bg-gradient-to-br from-green-50 via-red-50 via-blue-50 to-indigo-100">
      <NavBar />
      <Center />
      <Features />
      <Testimonial />
      <Plan />
      <Footer />
    </div>
  )
}

export default Home