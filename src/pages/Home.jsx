import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg01 from '../assets/images/gc1.jpg'
import heroImg02 from '../assets/images/gc2.jpg'
import heroImg03 from '../assets/images/gc3.jpg'

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="hero__section pt-[60px] 2xl:h-[800px]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
          <div>
            <div className="lg:w-[570px]">
              <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                Where everyday necessities meet culinary possibilities
              </h1>
              <p className="text__para">
                Grocery stores, the heartbeats of communities, offer a cornucopia of choices, from fresh produce to pantry staples, uniting us in the joy of sustenance and the art of nourishment
              </p>

              <button
                className="bg-blue-500 mt-[20px] px-5 py-2 text-white rounded-md"
                onClick={() => navigate("/products")}
              >
                Our Products
              </button>
            </div>

            <div className="mt-[30px] flex lg:items-center gap-5 lg:gap[30px]">
              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-700 text-headingColor">
                  5000+
                </h2>
                <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                <p className="text__para">Total Products</p>
              </div>

              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-700 text-headingColor">
                  200+
                </h2>
                <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                <p className="text__para">WareHouses</p>
              </div>

              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-700 text-headingColor">
                  100%
                </h2>
                <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                <p className="text__para">customer Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="flex gap-[30px] justify-end">
            <div>
              <img src={heroImg01} alt="" className="w-full" />
            </div>
            <div className="mt-[30px]">
              <img src={heroImg02} alt="" className="w-full mb-[30px]" />
              <img src={heroImg03} alt="" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
