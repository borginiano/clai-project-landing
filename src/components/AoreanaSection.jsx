import React from 'react';
import { Sparkles } from 'lucide-react';
import { LINKS } from '../constants';
import { motion } from 'framer-motion';

const AoreanaSection = () => {
    return (
        <section id="aoreana" className="py-24 bg-slate-950 border-y border-slate-800 px-6 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-xs mb-4 font-mono">
                            <Sparkles size={14} /> Spotlight
                        </div>
                        <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">AOREANA</h3>
                        <p className="text-slate-400 mt-4 text-lg font-light max-w-xl italic">
                            La niña y el dragón. Una odisea visual generada íntegramente con motores de IA y renderizada con Google FLOW.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex gap-4"
                    >
                        <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-center shadow-lg min-w-[100px]">
                            <span className="block text-blue-500 font-bold text-xl uppercase font-mono">4K</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Res</span>
                        </div>
                        <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-center shadow-lg min-w-[100px]">
                            <span className="block text-purple-500 font-bold text-xl uppercase font-mono">AI</span>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Film</span>
                        </div>
                    </motion.div>
                </div>

                {/* Reusando la misma estructura de iframe */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <div className="relative bg-black border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl aspect-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src={LINKS.aoreanaTrailer}
                            title="AOREANA Official Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </motion.div>
                <p className="mt-8 text-[10px] text-center text-slate-600 font-mono uppercase tracking-[0.4em]">
           // secure_narrative_stream: node_aoreana_active
                </p>
            </div>
        </section>
    );
};

export default AoreanaSection;
