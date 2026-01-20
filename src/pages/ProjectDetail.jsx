import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Loader2, PlayCircle, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjectWithRetry();
        window.scrollTo(0, 0);
    }, [slug]);

    const fetchProjectWithRetry = async (retries = 3) => {
        setLoading(true);
        setError(null);

        for (let i = 0; i < retries; i++) {
            try {
                // racing against a timeout
                const timeoutDetails = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 15000));

                const fetchPromise = supabase
                    .from('modules')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                const { data, error: fetchErr } = await Promise.race([fetchPromise, timeoutDetails]);

                if (fetchErr) throw fetchErr;
                if (!data) throw new Error("Not Found");

                setProject(data);
                setLoading(false);
                return; // Success
            } catch (err) {
                console.error(`Attempt ${i + 1} failed:`, err);
                if (i === retries - 1) {
                    setError(err.message === "Not Found" ? "Project Not Found" : "Connection Failed. Check your internet.");
                    setLoading(false);
                }
                // wait 1s before retry
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-sm font-mono text-slate-500 animate-pulse">Establishing Secure Connection...</p>
        </div>
    );

    if (error || !project) return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-6">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                <Layers size={32} />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest">{error || "Project Not Found"}</h2>
            <p className="text-slate-500 max-w-sm text-center mb-4">
                We couldn't load the module data from the core server. This is likely a network timeout.
            </p>
            <button
                onClick={() => fetchProjectWithRetry()}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-blue-500/25"
            >
                Retry Connection
            </button>
            <Link to="/" className="text-slate-600 hover:text-white text-xs font-mono uppercase underline decoration-slate-800 underline-offset-4">
                Return to Dashboard
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-slate-950 z-0 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors text-sm uppercase tracking-widest font-bold">
                        <ArrowLeft size={16} /> Back to Core
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row gap-12 items-start"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                {project.status && (
                                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border ${project.status === 'live' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'}`}>
                                        {project.status}
                                    </span>
                                )}
                                {project.tags && project.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-mono text-slate-500">#{tag}</span>
                                ))}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
                                {project.title}
                            </h1>
                            <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl mb-8 border-l-2 border-blue-500 pl-6">
                                {project.description}
                            </p>

                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
                                >
                                    Launch Module <ExternalLink size={16} />
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content & Media Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
                {/* Main Content (Left Col) */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Video Section */}
                    {project.video_url && (
                        <div className="rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl relative group">
                            {/* Simple embed detection or generic link */}
                            <div className="aspect-video w-full flex items-center justify-center bg-black">
                                {project.video_url.includes('youtube') || project.video_url.includes('youtu.be') ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={project.video_url.replace('watch?v=', 'embed/')}
                                        title="Project Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <a href={project.video_url} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 text-slate-500 hover:text-white transition-colors">
                                        <PlayCircle size={64} />
                                        <span className="text-xs uppercase tracking-widest">Watch Trailer</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Rich Text Content */}
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-slate-400 prose-a:text-blue-400">
                        <ReactMarkdown>
                            {project.content || "_No detailed documentation available yet._"}
                        </ReactMarkdown>
                    </div>

                    {/* Gallery (If any) */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
                                <Layers size={24} className="text-blue-500" /> Visual Assets
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.gallery.map((img, idx) => (
                                    <img key={idx} src={img} alt={`Gallery ${idx}`} className="rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all opacity-80 hover:opacity-100" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar (Right Col) */}
                <div className="space-y-8">
                    {/* Features Box */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm sticky top-32">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">System Features</h4>
                        <ul className="space-y-4">
                            {project.features && Array.isArray(project.features) ? (
                                project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                                        <span className="text-sm leading-relaxed">{feature}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-slate-600 text-sm italic">Standard core features only.</li>
                            )}
                        </ul>

                        <div className="mt-8 pt-8 border-t border-slate-800">
                            <div className="text-[10px] text-slate-600 uppercase tracking-widest font-mono mb-2">Module ID</div>
                            <div className="text-xs font-mono text-slate-400 truncate">{project.id}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProjectDetail;
