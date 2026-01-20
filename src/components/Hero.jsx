import React from 'react';
import { Zap, PlayCircle } from 'lucide-react';
import { LINKS } from '../constants';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6 text-center">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
                >
                    <Zap size={12} className="fill-current" /> Antigravity Core
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.9]"
                >
                    SOFTWARE <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 italic uppercase">Architecture</span>
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl font-mono text-slate-400 mb-8 tracking-tighter uppercase font-bold"
                >
                    Caos Leitmotiv Artificial Intelligence
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
                >
                    Desarrollando con IA, como extensión de la creatividad.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a href={LINKS.gumroad} target="_blank" rel="noreferrer" className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 shadow-xl w-full sm:w-auto transition-all">Download CL-GUIONISTA</a>
                    <a href="#aoreana" className="bg-blue-600 text-white border border-blue-500/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-500 w-full sm:w-auto transition-all flex items-center justify-center gap-2">
                        Ver Trailer <PlayCircle size={18} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
