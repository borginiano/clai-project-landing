import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadCapture = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus("loading");

        try {
            const { error } = await supabase.from('leads').insert([{ email, interests: 'General Interest' }]);
            if (error) throw error;
            setStatus("success");
            setEmail("");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <section className="py-24 bg-slate-950 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 p-12 rounded-[40px] text-center relative z-10 backdrop-blur-sm"
            >
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Únete a la Red</h3>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto font-light">
                    Sé el primero en acceder a las herramientas de Antigravity y recibir actualizaciones sobre el desarrollo de la IA Creativa.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative">
                    <div className="relative flex-grow">
                        <Mail className="absolute left-4 top-3.5 text-slate-500" size={20} />
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-slate-200 outline-none focus:border-blue-500 transition-all placeholder:text-slate-600 font-mono text-sm h-12"
                            required
                        />
                    </div>
                    <button
                        disabled={status === 'loading' || status === 'success'}
                        className={`font-bold px-8 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-xs h-12 ${status === 'success' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-950 hover:bg-slate-200'}`}
                    >
                        {status === 'loading' ? <Loader2 className="animate-spin" /> :
                            status === 'success' ? <><CheckCircle2 size={16} /> Joined</> :
                                'Subscribe'}
                    </button>

                    <AnimatePresence>
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -bottom-8 left-0 w-full text-center text-red-400 text-xs font-mono"
                            >
                                Error al unir. Intenta nuevamente.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
        </section>
    );
};

export default LeadCapture;
