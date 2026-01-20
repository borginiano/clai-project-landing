import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let result;
            if (isLogin) {
                result = await signIn(email, password);
            } else {
                result = await signUp(email, password, username);
            }

            if (result.error) throw result.error;

            navigate('/admin'); // Redirect to admin (or home, handled by protected route)
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-slate-900/50 border border-slate-800 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
                        {isLogin ? 'Access Core' : 'Init Identity'}
                    </h2>
                    <p className="text-slate-400 text-sm font-mono uppercase tracking-widest">
                        // CLAI_SECURE_GATEWAY
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-xs">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="USERNAME"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-200 outline-none focus:border-blue-500 transition-all placeholder:text-slate-600 font-mono text-sm"
                                required
                            />
                        </div>
                    )}

                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="email"
                            placeholder="EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-200 outline-none focus:border-blue-500 transition-all placeholder:text-slate-600 font-mono text-sm"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-200 outline-none focus:border-blue-500 transition-all placeholder:text-slate-600 font-mono text-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>{isLogin ? 'Connect' : 'Register'} <ArrowRight size={16} /></>}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-500 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors"
                    >
                        {isLogin ? 'Create New Uplink' : 'Existing Connection?'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
