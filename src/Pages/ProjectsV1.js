import React from 'react';
import { arrow, demoIcon, demoIcon1, github } from "../assets/icons";
import { Link } from "react-router-dom";
import { projects } from '../constants/index';
import { motion } from 'framer-motion';
const ProjectsV1 = () => {
    return (
        <section className="bg-black">
            <section className="max-container text-[#70d8bd]">
                <motion.h1
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.5 }}
                    className="head-text">
                    My,
                    <span className="blue-gradient_text font-semibold">Projects</span>
                </motion.h1>
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.5 }}
                    className="mt-5 flex flex-col gap-3 text-slate-500">
                    <p className="text-sm">
                        Join me in my journey of sharing: Explore my collection of free projects from my college and work experiences. Your help isn't just wanted, it's appreciated and cheered for!
                    </p>
                </motion.div>
                <div className="flex flex-wrap my-20 gap-16">
                    {projects.map((project, index) => (
                        index % 2 === 0 ?
                            <motion.div
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                                className="lg:w-[400px] w-full" key={index}>
                                <div className="block-container w-12 h-12">
                                    <div className={`btn-back rounded-xl ${project.theme}`} />
                                    <div className="btn-front rounded-xl flex justify-center items-center">
                                        <img
                                            src={project.iconUrl}
                                            alt="threads"
                                            className="w-1/2 h-1/2 object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col">
                                    <h4 className="text-2xl font-poppins font-semibold">
                                        {project.name}
                                    </h4>
                                    <p className="mt-2 text-slate-500">{project.description}</p>
                                    <div className="mt-5 flex items-center gap-2 font-poppins">
                                        {project.git.status && <Link
                                            to={project.git.gitlink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-blue-600"
                                        >
                                            Git Hub
                                        </Link>}
                                        {project.git.status && <img
                                            src={github}
                                            alt="arrow"
                                            className="w-4 h-4 object-contain bg-white rounded-lg"
                                        />}

                                        {project.demo.status && <Link
                                            to={project.demo.demolink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-blue-600"
                                        >
                                            Demo
                                        </Link>}
                                        {project.demo.status && <img
                                            src={demoIcon1}
                                            alt="arrow"
                                            className="w-4 h-4 object-contain bg-white rounded-lg"
                                        />}
                                    </div>
                                </div>
                            </motion.div> : <motion.div
                                whileInView={{ opacity: 1, x: 0 }}
                                initial={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.5 }}
                                className="lg:w-[400px] w-full" key={index}>
                                <div className="block-container w-12 h-12">
                                    <div className={`btn-back rounded-xl ${project.theme}`} />
                                    <div className="btn-front rounded-xl flex justify-center items-center">
                                        <img
                                            src={project.iconUrl}
                                            alt="threads"
                                            className="w-1/2 h-1/2 object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col">
                                    <h4 className="text-2xl font-poppins font-semibold">
                                        {project.name}
                                    </h4>
                                    <p className="mt-2 text-slate-500">{project.description}</p>
                                    <div className="mt-5 flex items-center gap-2 font-poppins">
                                        {project.git.status && <Link
                                            to={project.git.gitlink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-blue-600"
                                        >
                                            Git Hub
                                        </Link>}
                                        {project.git.status && <img
                                            src={github}
                                            alt="arrow"
                                            className="w-4 h-4 object-contain bg-white rounded-lg"
                                        />}

                                        {project.demo.status && <Link
                                            to={project.demo.demolink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-blue-600"
                                        >
                                            Demo
                                        </Link>}
                                        {project.demo.status && <img
                                            src={demoIcon1}
                                            alt="arrow"
                                            className="w-4 h-4 object-contain bg-white rounded-lg"
                                        />}
                                    </div>
                                </div>
                            </motion.div>
                    ))}
                </div>
                <hr className="border-slate-200" />
            </section>
        </section>
    );
};

export default ProjectsV1;