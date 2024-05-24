import React from 'react';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from '../constants/index';
import { motion } from 'framer-motion';
const Experience = () => {
    return (
        <section className="">
            <section className="max-container ">
                <div className="py-16">
                    <motion.h1
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.5 }}
                        className='my-20 text-center text-4xl'>
                        Experience
                    </motion.h1>
                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="mt-5 flex flex-col gap-3 text-neutral-100">
                        <p>
                            Reflecting on my undergraduate journey, I'm filled with gratitude
                            for the invaluable internships and the wonderful individuals I had
                            the privilege to collaborate with. These experiences have been
                            instrumental in my personal and professional growth, shaping me
                            into the person I am today.
                        </p>
                    </motion.div>
                    <div className="mt-12 flex text-neutral-900">
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
            </section>
        </section>
    );
};

export default Experience;