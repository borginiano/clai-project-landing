import React from 'react';
import { Linkedin, Youtube, Twitter } from 'lucide-react';
import { LINKS } from '../constants';

const Footer = () => {
    return (
        <footer className="py-24 bg-slate-950 border-t border-slate-900 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex justify-center gap-6 mb-8 text-slate-400">
                    <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-slate-900 rounded-full hover:text-white transition-all border border-slate-800 shadow-md"><Linkedin size={22} /></a>
                    <a href={LINKS.youtube} target="_blank" rel="noreferrer" className="p-4 bg-slate-900 rounded-full hover:text-white transition-all border border-slate-800 shadow-md"><Youtube size={22} /></a>
                    <a href={LINKS.twitter} target="_blank" rel="noreferrer" className="p-4 bg-slate-900 rounded-full hover:text-white transition-all border border-slate-800 shadow-md"><Twitter size={22} /></a>
                </div>
                <span className="text-[10px] text-slate-600 font-mono tracking-widest uppercase font-bold text-center block">© 2026 CLAI PROJECT / ARGENTINA</span>
            </div>
        </footer>
    );
};

export default Footer;
