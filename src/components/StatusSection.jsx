import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { SYSTEM_STATUS, DEPLOYMENT_LOGS } from '../constants';
import GeminiTerminal from './ui/GeminiTerminal';
import { motion } from 'framer-motion';

const StatusSection = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="status" className="py-24 bg-slate-900/10 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2 uppercase tracking-tighter"><Activity className="text-blue-500" /> Monitoreo</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {SYSTEM_STATUS.map((sys, i) => (
                            <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="font-bold text-slate-200 font-mono tracking-tight text-xs uppercase">{sys.name}</span>
                                    <span className="text-[9px] font-bold text-emerald-500 uppercase flex items-center gap-1.5 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> {sys.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                                    <span>UPTIME: {sys.uptime}</span>
                                    <span>LOAD: {sys.load}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <GeminiTerminal />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-full min-h-[400px] shadow-2xl font-mono"
                >
                    <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-800 flex justify-between items-center text-[10px] text-slate-400 tracking-widest uppercase">
                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 bg-red-500/50 rounded-full"></div><div className="w-2.5 h-2.5 bg-yellow-500/50 rounded-full"></div><div className="w-2.5 h-2.5 bg-green-500/50 rounded-full"></div></div>
                        System_Logs
                    </div>
                    <div className="p-5 text-[11px] space-y-2 overflow-y-auto flex-grow custom-scrollbar">
                        {DEPLOYMENT_LOGS.map((log, i) => (
                            <div key={i} className="flex gap-3"><span className="text-slate-600 font-bold">[{log.time}]</span><span className={log.type === 'success' ? 'text-emerald-500' : 'text-blue-400'}>{log.msg}</span></div>
                        ))}
                        <div className="text-slate-500 animate-pulse font-bold">[{currentTime}] _ kernel_listening...</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StatusSection;
