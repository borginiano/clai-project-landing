import React, { useState, useEffect } from 'react';
import { Linkedin, Youtube } from 'lucide-react';
import { LINKS } from '../constants';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-6'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2 text-white">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-xl font-bold tracking-tighter font-mono">CL</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden sm:block font-mono uppercase">CLAI Engine</span>
                </div>
                <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    <a href="#status" className="text-slate-400 hover:text-blue-400 transition-colors uppercase text-xs tracking-widest font-bold">Estatus</a>
                    <a href="#aoreana" className="text-slate-400 hover:text-blue-400 transition-colors uppercase font-black tracking-tighter text-sm">Aoreana</a>
                    <a href="#ecosistema" className="text-slate-400 hover:text-blue-400 transition-colors uppercase text-xs tracking-widest font-bold">Ecosistema</a>
                    <a href="#cinema" className="text-slate-400 hover:text-blue-400 transition-colors uppercase text-xs tracking-widest font-bold">IA Cinema</a>
                    <a href="#software" className="text-slate-400 hover:text-blue-400 transition-colors uppercase text-xs tracking-widest font-bold">Software</a>
                    <div className="h-4 w-px bg-slate-800 mx-2"></div>
                    <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-all hover:scale-110"><Linkedin size={18} /></a>
                    <a href={LINKS.youtube} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-all hover:scale-110"><Youtube size={18} /></a>
                    <a href={LINKS.gumroad} target="_blank" rel="noreferrer" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full shadow-lg text-[10px] uppercase font-bold tracking-widest transition-all active:scale-95">Comprar Ahora</a>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
