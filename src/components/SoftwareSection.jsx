import React from 'react';
import { Film, Theater, BookOpen, Cpu, Sparkles, ShoppingBag } from 'lucide-react';
import { LINKS } from '../constants';
import { motion } from 'framer-motion';

const SoftwareSection = () => {
    return (
        <section id="software" className="py-24 bg-slate-950 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center font-sans">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 shadow-2xl relative order-2 lg:order-1 font-mono"
                >
                    <h5 className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2 tracking-[0.4em]">
                        <Sparkles size={14} /> Desktop Core ✨
                    </h5>
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[10px] text-slate-500 mb-4 font-mono uppercase tracking-widest">
            // CL-GUIONISTA DESKTOP MODULE <br />
            // ASYNC PREMISE GENERATOR READY
                    </div>
                    <p className="text-sm text-slate-400 mb-8 italic font-sans font-light leading-relaxed">
                        Prueba la potencia de nuestra herramienta nativa para autores profesionales en tu propia workstation.
                    </p>
                    <a href={LINKS.gumroad} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-white text-slate-950 px-10 py-4 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all shadow-xl uppercase tracking-widest w-full justify-center active:scale-95 font-mono">Obtener Licencia <ShoppingBag size={18} /></a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-1 lg:order-2 text-center lg:text-left"
                >
                    <h2 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4 font-mono tracking-[0.3em]">Win x64 Platform</h2>
                    <h3 className="text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-tight">CL-GUIONISTA</h3>
                    <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light italic">"La herramienta definitiva para la narrativa multimodal."</p>
                    <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto lg:mx-0 font-mono text-center">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all shadow-lg"><Film className="text-blue-500 mb-3 mx-auto" /><span className="text-[10px] font-bold text-white uppercase tracking-widest">Cine & TV</span></div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all shadow-lg"><Theater className="text-blue-500 mb-3 mx-auto" /><span className="text-[10px] font-bold text-white uppercase tracking-widest text-nowrap">Escena</span></div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all shadow-lg"><BookOpen className="text-blue-500 mb-3 mx-auto" /><span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">eBooks</span></div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all shadow-lg"><Cpu className="text-blue-500 mb-3 mx-auto" /><span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Multi-IA</span></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SoftwareSection;
