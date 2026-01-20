import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MessageSquare, Store, Box, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const EcosystemSection = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const { data, error } = await supabase
                .from('modules')
                .select('*')
                .eq('status', 'live') // Only show live modules for now
                .order('created_at', { ascending: true }); // Keep order consistent

            if (error) console.error('Error fetching modules:', error);
            else if (data) setModules(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (tags) => {
        if (tags?.includes('social')) return <MessageSquare size={32} className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />;
        if (tags?.includes('marketplace')) return <Store size={32} className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />;
        return <Box size={32} className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" />;
    };

    const getColor = (tags) => {
        if (tags?.includes('social')) return 'border-indigo-500/50 bg-indigo-600 hover:bg-indigo-500';
        if (tags?.includes('marketplace')) return 'border-emerald-500/50 bg-emerald-600 hover:bg-emerald-500';
        return 'border-blue-500/50 bg-blue-600 hover:bg-blue-500';
    };

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

                {loading ? (
                    <div className="flex justify-center text-blue-500"><Loader2 className="animate-spin" size={32} /></div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-8 text-left font-mono">
                        {modules.map((module, index) => (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`group bg-slate-900 border border-slate-800 p-10 rounded-[40px] transition-all relative overflow-hidden shadow-xl hover:${getColor(module.tags).split(' ')[0]}`}
                            >
                                {getIcon(module.tags)}
                                <h4 className="text-3xl font-bold text-white mb-4 tracking-tighter uppercase font-mono">{module.title}</h4>
                                <p className="text-slate-400 mb-8 text-sm leading-relaxed font-light italic font-sans text-balance">{module.description}</p>
                                {module.url && (
                                    <a href={module.url} target="_blank" rel="noreferrer" className={`${getColor(module.tags).split(' ').slice(1).join(' ')} text-white px-8 py-4 rounded-2xl font-bold block text-center transition-all shadow-lg text-[10px] uppercase tracking-widest active:scale-95`}>
                                        Explorar
                                    </a>
                                )}
                            </motion.div>
                        ))}
                        {modules.length === 0 && (
                            <div className="col-span-2 text-center text-slate-500 font-mono text-xs">
                    // SYSTEM_IDLE: No active modules detected.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EcosystemSection;
