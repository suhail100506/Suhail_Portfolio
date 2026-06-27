'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_STACK } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const slideUpEl =
                containerRef.current?.querySelectorAll('.slide-up');

            if (!slideUpEl?.length) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 40%',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up', {
                opacity: 0,
                y: 40,
                ease: 'none',
                stagger: 0.05,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 40%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section id="my-stack" ref={containerRef}>
            <div className="container">
                <SectionTitle title="My Stack" />
                <p className="mt-6 mb-12 text-lg text-muted-foreground max-w-3xl">
                    A production‑focused <strong>MERN / TypeScript</strong> toolkit covering <strong>frontend performance</strong>, <strong>accessibility</strong>, <strong>API design</strong>, and <strong>database modeling</strong>. Each technology is selected to accelerate development while keeping deployments secure, maintainable, and SEO‑friendly.
                </p>

                <div className="space-y-20">
                    {Object.entries(MY_STACK).map(([key, value]) => (
                        <div className="grid sm:grid-cols-12" key={key}>
                            <div className="sm:col-span-5">
                                <h3 className="slide-up text-5xl font-anton leading-none text-muted-foreground uppercase">
                                    {key}
                                </h3>
                            </div>

                            <div className="sm:col-span-7 flex gap-x-11 gap-y-9 flex-wrap">
                                {value.map((item) => (
                                    <div
                                        className="slide-up flex gap-3.5 items-center leading-none"
                                        key={item.name}
                                    >
                                        <div className="w-10 h-10 flex items-center justify-center">
                                            {item.name === 'Docker' ? (
                                                <div
                                                    style={{
                                                        backgroundColor: '#1D63ED',
                                                        borderRadius: '8px',
                                                        padding: '6px',
                                                        width: '40px',
                                                        height: '40px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Image
                                                        src={item.icon}
                                                        alt={item.name}
                                                        width={28}
                                                        height={28}
                                                        className="w-auto"
                                                    />
                                                </div>
                                            ) : (
                                                <Image
                                                    src={item.icon}
                                                    alt={item.name}
                                                    width={item.name === 'Postman' ? 52 : 40}
                                                    height={item.name === 'Postman' ? 52 : 40}
                                                    className="max-h-10 w-auto"
                                                />
                                            )}
                                        </div>
                                        <span className="text-2xl capitalize">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
