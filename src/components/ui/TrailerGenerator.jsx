import React, { useState } from 'react';
import { Loader2, Clapperboard, Sparkles } from 'lucide-react';
import { callGeminiAPI } from '../../utils/gemini';
import { motion, AnimatePresence } from 'framer-motion';

const TrailerGenerator = () => {
    const [topic, setTopic] = useState("");
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneration = async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        setOutput("");
        try {
            const systemMsg = "Eres el director creativo de CLAI Project. Genera la estructura épica de un tráiler (escenas, voz en off, música).";
            const res = await callGeminiAPI(`Genera un tráiler para: ${topic}`, systemMsg);
            setOutput(res);
        } catch (err) {
            setOutput("Error en el motor creativo cinematográfico.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[40px] blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative bg-slate-900/50 border border-slate-800 p-8 rounded-[40px] shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-tighter text-sm font-mono">Director de Tráilers ✨</h4>
                    <Sparkles className="text-purple-500 animate-pulse" size={20} />
                </div>

                <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe tu visión épica..."
                    className="w-full h-32 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm outline-none focus:border-purple-500 transition-colors mb-4 text-slate-300 resize-none font-light"
                />

                <button
                    onClick={handleGeneration}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-3 hover:shadow-xl transition-all active:scale-[0.98] uppercase text-[10px] tracking-widest font-mono shadow-lg disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : <><Clapperboard size={20} /> Generar Estructura</>}
                </button>

                <AnimatePresence>
                    {output && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-8 p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl text-[10px] text-slate-400 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto italic font-mono custom-scrollbar"
                        >
                            {output}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TrailerGenerator;
