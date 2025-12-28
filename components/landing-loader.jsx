"use client"
import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
// import CustomEase from "gsap/CustomEase"; // Might fail if not available
import "./landing-loader.css"


const LandingLoader = () => {
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        // Fallback for CustomEase "hop"
        const hopEase = "power4.inOut";

        // Try to register CustomEase if valid, else ignore
        // gsap.registerPlugin(CustomEase);
        // try { CustomEase.create("hop", "0.9, 0, 0.1, 1"); hopEase = "hop"; } catch(e) {}

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: hopEase,
                }
            });

            const counts = document.querySelectorAll(".count");

            // 1. Counter Sequence (User Code Logic)
            counts.forEach((count, index) => {
                const digits = count.querySelectorAll(".digit h1");

                // Enter (y: 0%)
                tl.to(
                    digits,
                    {
                        y: "0%",
                        duration: 0.75,
                        stagger: 0.05,
                    },
                    index * 0.5 // Sequence delay
                );

                // Exit (y: -100%)
                if (index < counts.length) {
                    tl.to(
                        digits,
                        {
                            y: "-100%",
                            duration: 0.75,
                            stagger: 0.05,
                        },
                        index * 0.5 + 0.5
                    );
                }
            });

            // 2. Spinner Fade
            tl.to(".spinner", {
                opacity: 0,
                duration: 0.25,
            });

            // 3. Logo Reveal ("<" of spinner fade?)
            tl.to(".word h1",
                { y: "0%", duration: 0.8 },
                "<"
            );

            // 4. Divider Scale
            tl.to(".divider", {
                scaleY: 1,
                duration: 0.6,
                onComplete: () => {
                    gsap.to(".divider", { opacity: 0, duration: 0.25, delay: 0.15 })
                }
            });

            // 5. Logo Exit (Split) - INSTANT
            tl.to("#word-1 h1", {
                y: "100%",
                duration: 0.4,
                ease: "power2.in"
            });

            tl.to("#word-2 h1", {
                y: "-100%",
                duration: 0.4,
                ease: "power2.in"
            }, "<");

            // 6. Block Wipe (The Reveal) - IMMEDIATE OVERLAP
            tl.to(".block", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: 0.5,
                stagger: 0,
                ease: "expo.inOut",
                onStart: () => {
                    // Page Scale In - SNAP
                    gsap.fromTo("#main-content",
                        { scale: 1.1, filter: "blur(10px)" },
                        { scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
                    );
                }
            }, "<"); // Start exactly when logo starts exiting

            // Cleanup Main Loader
            tl.to(containerRef.current, { display: "none" });

        }, containerRef);

        return () => ctx.revert();
    }, []);



    return (
        <div className="loader" ref={containerRef}>
            <div className="overlay">
                <div className="block"></div>
                <div className="block"></div>
            </div>

            <div className="intro-logo">
                <div className="word" id="word-1">
                    <h1><span>Xpe</span></h1>
                </div>
                <div className="word" id="word-2">
                    <h1>nso</h1>
                </div>
            </div>

            <div className="divider"></div>

            <div className="spinner-container">
                <div className="spinner"></div>
            </div>

            <div className="counter">
                {/* 00 */}
                <div className="count">
                    <div className="digit"><h1>0</h1></div>
                    <div className="digit"><h1>0</h1></div>
                </div>
                {/* 27 */}
                <div className="count">
                    <div className="digit"><h1>2</h1></div>
                    <div className="digit"><h1>7</h1></div>
                </div>
                {/* 65 */}
                <div className="count">
                    <div className="digit"><h1>6</h1></div>
                    <div className="digit"><h1>5</h1></div>
                </div>
                {/* 99 */}
                <div className="count">
                    <div className="digit"><h1>9</h1></div>
                    <div className="digit"><h1>9</h1></div>
                </div>
            </div>
        </div>
    )
}

export default LandingLoader
