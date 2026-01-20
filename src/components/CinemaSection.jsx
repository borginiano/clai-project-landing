import React from 'react';
import { Clapperboard, Video, PlayCircle } from 'lucide-react';
import TrailerGenerator from './ui/TrailerGenerator';
import { motion } from 'framer-motion';

const CinemaSection = () => {
    return (
        <section id="cinema" className="py-24 bg-slate-950 px-6 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 font-mono text-nowrap">
                            <Clapperboard size={12} /> Multimedia Studio
                        </div>
                        <h3 className="text-5xl font-black text-white mb-6 tracking-tight uppercase">IA CINEMA <br /><span className="text-purple-500 font-italic">Future-Proof</span></h3>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed font-light italic">
                            Prototipado visual de alto impacto. Integramos motores generativos de vanguardia para elevar la narrativa independiente.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-[24px] hover:border-purple-500/40 transition-colors group/item">
                                <Video className="text-purple-500 shrink-0 group-hover/item:scale-110 transition-transform" size={24} />
                                <div>
                                    <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-mono">Visual Synthesis</h4>
                                    <p className="text-[11px] text-slate-500">Modelado cinemático con fidelidad 4K asistido por Gemini.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-[24px] hover:border-purple-500/40 transition-colors group/item">
                                <PlayCircle className="text-purple-500 shrink-0 group-hover/item:scale-110 transition-transform" size={24} />
                                <div>
                                    <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1 font-mono">Narrative Editing</h4>
                                    <p className="text-[11px] text-slate-500">Montaje rítmico basado en guiones técnicos automatizados.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <TrailerGenerator />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CinemaSection;
