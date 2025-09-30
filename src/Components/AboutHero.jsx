import React from "react";
import HeadWord from "./ui/HeadWord";
import Underline from "./ui/Underline";
import Card from "./ui/Card";
const AboutHero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-24 text-center">
      <HeadWord HeadWord="About Us"
                color="var(--main-color-2)"  />
      <Underline color="var(--main-color-2)" />
      <div className="w-full max-w-4xl mt-8">
        <Card
          description={
            "We are a group of high school students brought together by our shared passion for art in its visual or digital form,and due to being equipped with the necessary skills besides the inspiring passion, in 2024, we founded this club for the purpose of promoting the artistic community not only in our school but in our whole country, Egypt. October Visual Arts Club is a community devoted to providing a welcoming environment for those who hold an interest in various forms of visual expression, including graphic design, video production, and 3D design. The club is committed to nurturing the growth of its members as artists by hosting regular lectures, in addition to monitoring this growth through weekly assignments."
          }
        />
      </div>
    </div>
  );
};

export default AboutHero;
