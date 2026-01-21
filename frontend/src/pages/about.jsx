import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      {/* ABOUT US TITLE */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* ABOUT CONTENT */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About Us"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            StyleAura was created with a vision to redefine modern fashion by
            blending style, comfort, and confidence. What started as a passion
            for trends has grown into a platform that celebrates individuality.
          </p>

          <p>
            From timeless classics to contemporary designs, we carefully curate
            our collections to ensure every piece reflects quality and elegance.
            Our goal is to make fashion accessible and enjoyable for everyone.
          </p>

          <b className="text-gray-800">Our Mission</b>
          <p>
            At StyleAura, our mission is to inspire confidence through fashion by
            offering versatile, high-quality styles paired with a seamless
            shopping experience.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Premium Quality</b>
          <p className="text-gray-600">
            Each StyleAura product goes through strict quality checks to ensure
            durability, comfort, and long-lasting style.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Easy & Convenient</b>
          <p className="text-gray-600">
            Our user-friendly website and smooth checkout process make shopping
            effortless and enjoyable from start to finish.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Dedicated Support</b>
          <p className="text-gray-600">
            Our support team is always ready to assist you with queries, ensuring
            a reliable and pleasant shopping experience.
          </p>
        </div>
      </div>

      {/* NEWSLETTER */}
      <NewsletterBox />
    </div>
  );
};

export default About;
