import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1)
    return (
      <h1 className="sm:text-sm sm:leading-snug text-center py-2 px-4 text-[#70d8bd] mx-5">
        Hello, I'm
        <span className="font-semibold mx-2 text-white">Sameer </span>
        👋
        <br />A Software developer and Internet Of Things (IoT) Engineer Student
        From Savonia University
      </h1>
    );

  if (currentStage === 2) {
    return (
      <div>
        <p className="font-medium sm:text-sm text-center text-[#70d8bd]">
          I have worked in different sectors of Software Engineering and
          Internet Of Things (IoT) <br /> and picked up many skills along the
          way
        </p>

        <Link
          to="/about"
          className="text-[#ffffff] flex justify-center items-center"
        >
          Learn more
          <img
            src={arrow}
            alt="arrow"
            className="w-4 h-4 object-contain ml-1"
          />
        </Link>
      </div>
    );
  }

  if (currentStage === 3) {
    return (
      <div>
        <p className="font-medium sm:text-sm text-center text-[#70d8bd]">
          I have worked in different sectors of Software Engineering and
          Internet Of Things (IoT) <br /> and picked up many skills along the
          way
        </p>

        <Link
          to="/about"
          className="text-[#ffffff] flex justify-center items-center"
        >
          My Portfolio
          <img
            src={arrow}
            alt="arrow"
            className="w-4 h-4 object-contain ml-1"
          />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div>
        <p className="font-medium sm:text-sm text-center text-[#70d8bd]">
          🚀 Need a project done or looking for a developer? 🛠️ <br /> Whether
          it's mobile development, web development, or full-stack projects, I'm
          just a few keystrokes away!
          <br /> Let's create something amazing together. 💻📱
        </p>

        <Link
          to="/contact"
          className="text-[#ffffff] flex justify-center items-center"
        >
          Let's talk
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }

  return null;
};

export default HomeInfo;
