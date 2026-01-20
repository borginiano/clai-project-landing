import React, { useState } from 'react';
import { Send, Loader2, BrainCircuit } from 'lucide-react';
import { callGeminiAPI } from '../../utils/gemini';
import { motion, AnimatePresence } from 'framer-motion';

const GeminiTerminal = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleConsult = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setIsLoading(true);
        setResponse("");
        try {
            const systemMsg = "Eres el consultor técnico de CLAI Project. Responde sobre arquitectura Antigravity e IA. Sé conciso y técnico.";
            const res = await callGeminiAPI(prompt, systemMsg);
            setResponse(res);
        } catch (err) {
            setResponse("Error de conexión con la IA.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8 bg-slate-900/80 border border-blue-500/30 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><BrainCircuit size={100} /></div>
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-tighter text-sm font-mono">
                Consultor Técnico ✨
            </h4>
            <form onSubmit={handleConsult} className="flex gap-2 relative z-10">
                <input
                    type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}
                    placeholder="¿Cómo escala Antigravity?"
                    className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none text-slate-200 font-light"
                />
                <button className="bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition-all">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                </button>
            </form>
            <AnimatePresence>
                {response && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 p-5 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs text-slate-300 leading-relaxed italic"
                    >
                        {response}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GeminiTerminal;
