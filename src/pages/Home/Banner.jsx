import { Link } from "react-router";
import bannerImg from "../../assets/banner-car.jpg"; 

const Banner = () => {
  return (
    <div
      className="hero min-h-[75vh]"
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-white">
        <div className="max-w-2xl space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Drive Your Dreams Today!
          </h1>
          <p className="text-lg md:text-xl">
            Find your perfect ride from our wide selection of affordable and luxury cars.
          </p>
          <Link to="/available-cars">
            <button className="btn btn-primary text-white text-lg px-6">
              View Available Cars
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
