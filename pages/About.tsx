import React, { useEffect } from 'react';

const AboutView = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section id="about-page" className="w-full bg-black relative min-h-screen">
             <div className="max-w-7xl mx-auto px-6 py-10 md:py-20">
                
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* WHO WE ARE */}
                    <div className="md:col-span-2 border border-white/20 p-8 md:p-10 lg:p-12 bg-[#0a0a0a] relative group">
                        {/* Decorative scanline vertical */}
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-green-900/50 group-hover:bg-green-500/50 transition-colors"></div>
                        
         
                        <p className="font-space text-gray-300 text-lg md:text-xl leading-relaxed">
                            We're the largest student organization for Data Science, Machine Learning, and AI enthusiasts at IU Indianapolis. Our focus is helping Luddy students keep pace with developments in AI and Machine Learning.
                        </p>
                    </div>

                    {/* MISSION */}
                    <div className="border border-white/20 p-8 bg-[#0a0a0a] flex flex-col relative group">
                         <h3 className="font-vt323 text-3xl text-green-500 mb-6 tracking-wide">
                            &gt; MISSION
                        </h3>
                         <p className="font-space text-gray-300 leading-relaxed flex-grow">
                            Build a community where students can learn, collaborate, and grow in Data Science and AI through hands-on workshops, projects, and connections with faculty and industry.
                        </p>
                    </div>

                    {/* VISION */}
                    <div className="border border-white/20 p-8 bg-[#0a0a0a] flex flex-col relative group">
                        <h3 className="font-vt323 text-3xl text-green-500 mb-6 tracking-wide">
                            &gt; VISION
                        </h3>
                        <p className="font-space text-gray-300 leading-relaxed flex-grow">
                            Prepare Luddy students to lead in AI and Machine Learning by providing practical experience, technical knowledge, and professional networks.
                        </p>
                    </div>

                    {/* WHAT WE DO (DETAILED) */}
                    <div className="md:col-span-2 border border-white/20 p-8 md:p-10 lg:p-12 bg-[#0a0a0a] relative mt-4">
                        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-white/50"></div>
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-white/50"></div>

                        <h3 className="font-vt323 text-3xl md:text-4xl text-green-500 mb-6 tracking-wide">
                            &gt; WHAT_WE_DO
                        </h3>
                        
                        <p className="font-space text-gray-300 text-lg leading-relaxed mb-6">
                            We organize technical workshops covering ML and AI fundamentals. Beyond workshops, we organize or participate in:
                        </p>
                        
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-space text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 font-bold">&gt;</span>
                                <span>Industry Talks</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 font-bold">&gt;</span>
                                <span>ML Paper Presentations</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 font-bold">&gt;</span>
                                <span>Monthly Networking Events</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <span className="text-green-500 font-bold">&gt;</span>
                                <span>Professional Development Workshops</span>
                            </li>
                        </ul>
                        
                        
                    </div>

                </div>
            </div>
        </section>
    );
}

export default AboutView;
