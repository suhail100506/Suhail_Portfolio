'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 150,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -150,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section className="pb-section" id="about-me">
            <div className="container" ref={container}>
                <h2 className="text-4xl md:text-6xl font-thin mb-12 slide-up-and-fade">
                    Full Stack MERN & React.js Developer focused on
                    user‑centered design and scalable, performant web
                    applications.
                </h2>
                <p className="text-lg md:text-xl mb-16 slide-up-and-fade text-muted-foreground max-w-3xl">
                    I craft responsive, accessible interfaces with{' '}
                    <strong>React.js</strong>, implement secure APIs using{' '}
                    <strong>Node.js</strong> & <strong>Express</strong>,
                    optimize data flows with <strong>MongoDB</strong>, and
                    leverage <strong>Next.js</strong> for server‑side rendering,
                    SEO, and performance. My approach blends clean architecture,
                    semantic Design, progressive enhancement, and measurable
                    performance budgets to deliver real business value.
                </p>

                <p className="pb-3 border-b text-muted-foreground slide-up-and-fade">
                    This is me.
                </p>

                <div className="grid md:grid-cols-12 mt-9">
                    <div className="md:col-span-5">
                        <h3 className="text-5xl slide-up-and-fade font-anton">
                            Hi, I&apos;m Mohammed Suhail
                        </h3>
                    </div>
                    <div className="md:col-span-7">
                        <div className="text-lg text-muted-foreground max-w-[450px]">
                            <p className="slide-up-and-fade">
                                I am a passionate **Full Stack Developer** with hands-on experience in React.js, Node.js, Express.js, MongoDB, Tailwind CSS, and REST APIs. I build modern web applications, responsive user interfaces, and scalable backend systems.
                            </p>
                            <p className="mt-3 slide-up-and-fade">
                                I focus on **clean architecture**, performance optimization, and maintainable codebase structures. Having worked on projects including AI-powered language translation platforms, job portal platforms, and mobile applications, I enjoy translating product requirements into reliable full-stack solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
