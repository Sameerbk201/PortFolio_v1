import React, { useState } from "react";
import { experiences, skills } from "../constants";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import CTA from "../Components/CTA";
const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

const About = () => {
  return (
    <section className="bg-black">
      <section className="max-container text-[#70d8bd]">
        <h1 className="head-text">
          Hello, I am{" "}
          <span className="blue-gradient_text font-semibold">Sameer</span>
        </h1>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p className="text-sm">
            A software developer and IoT engineering student at Savonia
            University of Applied Sciences. Specializing in IoT, web, and mobile
            development, I'm driven by a passion for innovation and crafting
            impactful solutions that shape the future.
          </p>
        </div>
        <div className="py-10 flex flex-col">
          <h3 className="subhead-text">MySkills</h3>

          <div className="mt-16 flex flex-wrap gap-12 cursor-pointer">
            {skills.map((skill, index) => (
              <Tooltip key={index} text={skill.name}>
                <div className="block-container w-20 h-20">
                  <div className="btn-back rounded-xl" />
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className="w-1/2 h-1/2 object-contain"
                    />
                  </div>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
        <div className="py-16">
          <h3 className="subhead-text">Work Experience</h3>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              Reflecting on my undergraduate journey, I'm filled with gratitude
              for the invaluable internships and the wonderful individuals I had
              the privilege to collaborate with. These experiences have been
              instrumental in my personal and professional growth, shaping me
              into the person I am today.
            </p>
          </div>
          <div className="mt-12 flex">
            <VerticalTimeline>
              {experiences.map((experience, index) => (
                <VerticalTimelineElement
                  key={index}
                  date={experience.date}
                  iconStyle={{ background: experience.iconBg }}
                  icon={
                    <div className="flex justify-center items-center w-full h-full">
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: experience.iconBg,
                    boxShadow: "none",
                  }}
                >
                  <div>
                    <h3 className="text-black text-xl font-poppins font-semibold">
                      {experience.title}
                    </h3>
                    <p
                      className="text-black-500 font-medium text-base"
                      style={{ margin: 0 }}
                    >
                      {experience.company_name}
                    </p>
                  </div>

                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {experience.points.map((point, index) => (
                      <li
                        key={`experience-point-${index}`}
                        className="text-black-500/50 font-normal pl-1 text-sm"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>
        <hr className="border-slate-200" />
        <CTA />
      </section>
    </section>
  );
};

export default About;
