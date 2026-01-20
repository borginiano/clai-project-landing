import React from 'react';
import { MessageSquare, Store } from 'lucide-react';
import { LINKS } from '../constants';
import { motion } from 'framer-motion';

const EcosystemSection = () => {
    return (
        <section id="ecosistema" className="py-24 bg-slate-900/20 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-black text-white mb-16 tracking-tight uppercase"
                >
                    Ecosistema Antigravity
                </motion.h3>
                <div className="grid lg:grid-cols-2 gap-8 text-left font-mono">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="group bg-slate-900 border border-slate-800 p-10 rounded-[40px] hover:border-indigo-500/50 transition-all relative overflow-hidden shadow-xl"
                    >
                        <MessageSquare size={32} className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
                        <h4 className="text-3xl font-bold text-white mb-4 tracking-tighter uppercase font-mono">Be Free Network</h4>
                        <p className="text-slate-400 mb-8 text-sm leading-relaxed font-light italic font-sans text-balance">"Privacidad por Diseño". Ofuscación granular, comunicaciones seguras y Mystery Mode.</p>
                        <a href={LINKS.social} target="_blank" rel="noreferrer" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold block text-center hover:bg-indigo-500 transition-all shadow-lg text-[10px] uppercase tracking-widest active:scale-95">Explorar</a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group bg-slate-900 border border-slate-800 p-10 rounded-[40px] hover:border-emerald-500/50 transition-all relative overflow-hidden shadow-xl"
                    >
                        <Store size={32} className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                        <h4 className="text-3xl font-bold text-white mb-4 tracking-tighter uppercase font-mono">Click & Go</h4>
                        <p className="text-slate-400 mb-8 text-sm leading-relaxed font-light italic font-sans text-balance">Marketplace P2P directo. Asistente IA integrado y 0% comisiones.</p>
                        <a href={LINKS.marketplace} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold block text-center hover:bg-emerald-500 transition-all shadow-lg text-[10px] uppercase tracking-widest active:scale-95">Visitar</a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EcosystemSection;
