import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Plus, Trash2, Edit, Save, X, Loader2, LogOut, Copy, RefreshCw, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { user, profile, loading: authLoading, signOut } = useAuth();
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [modulesLoading, setModulesLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        content: '', // Rich markdown content
        status: 'dev',
        url: '',
        image_url: '',
        video_url: '', // Video
        gallery: '',   // Comma separated images
        tags: '',
        features: ''   // list of features
    });

    useEffect(() => {
        if (!authLoading) {
            if (!user || (profile && profile.role !== 'admin')) {
                navigate('/');
            } else {
                fetchModules();
            }
        }
    }, [user, profile, authLoading, navigate]);

    const fetchModules = async () => {
        const { data, error } = await supabase.from('modules').select('*').order('created_at', { ascending: false });
        if (error) console.error(error);
        else setModules(data);
        setModulesLoading(false);
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();

        // Basic Validation
        if (!formData.title || !formData.slug) {
            alert("Title and Slug are required!");
            return;
        }

        const formattedData = {
            ...formData,
            tags: formData.tags ? (typeof formData.tags === 'string' ? formData.tags.split(',').map(tag => tag.trim()) : formData.tags) : [],
            gallery: formData.gallery ? (typeof formData.gallery === 'string' ? formData.gallery.split(',').map(img => img.trim()) : formData.gallery) : [],
            features: formData.features ? (typeof formData.features === 'string' ? formData.features.split('\n').filter(f => f.trim() !== '') : formData.features) : []
        };

        // Remove ID if present for insert, but keep for update logic check
        const { id, ...dataToSave } = formattedData;

        try {
            let error;
            if (id) {
                // Update existing
                const result = await supabase.from('modules').update(dataToSave).eq('id', id);
                error = result.error;
            } else {
                // Insert new
                const result = await supabase.from('modules').insert([dataToSave]);
                error = result.error;
            }

            if (error) throw error;

            alert("Project Saved Successfully! 🚀");
            finalizeSave();
        } catch (err) {
            console.error("Save Error:", err);
            alert(`Error Saving: ${err.message}`);
        }
    };

    const finalizeSave = () => {
        setFormData({
            title: '', slug: '', description: '', content: '', status: 'dev',
            url: '', image_url: '', video_url: '', gallery: '', tags: '', features: ''
        });
        setIsEditing(false);
        fetchModules();
    };

    const handleEditClick = (module) => {
        setFormData({
            id: module.id,
            title: module.title,
            slug: module.slug || '',
            description: module.description || '',
            content: module.content || '',
            status: module.status,
            url: module.url || '',
            image_url: module.image_url || '',
            video_url: module.video_url || '',
            gallery: module.gallery ? module.gallery.join(', ') : '',
            tags: module.tags ? module.tags.join(', ') : '',
            features: module.features ? module.features.join('\n') : ''
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        const { error } = await supabase.from('modules').delete().match({ id });
        if (error) alert(error.message);
        else fetchModules();
    };

    const generateSlug = () => {
        const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setFormData({ ...formData, slug });
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    if (authLoading || (modulesLoading && user && profile?.role === 'admin')) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>;
    }

    if (!user || profile?.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">AD</div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight uppercase">Franky Engine</h1>
                            <p className="text-[10px] text-slate-400 font-mono tracking-widest">Logged as: {profile?.username || user?.email}</p>
                        </div>
                    </div>
                    <button onClick={handleSignOut} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"><LogOut size={20} /></button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2"><LayoutGrid className="text-blue-500" /> Active Modules</h2>
                    <button
                        onClick={() => {
                            setFormData({
                                title: '', slug: '', description: '', content: '', status: 'dev',
                                url: '', image_url: '', video_url: '', gallery: '', tags: '', features: ''
                            });
                            setIsEditing(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
                    >
                        <Plus size={16} /> New Project
                    </button>
                </div>

                {/* Module List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map(module => (
                        <motion.div
                            layout
                            key={module.id}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all group relative"
                        >
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => window.open(`/project/${module.slug}`, '_blank')} className="p-2 bg-slate-800 hover:bg-blue-600 rounded-lg text-white transition-colors" title="View Page"><Eye size={14} /></button>
                                <button onClick={() => handleEditClick(module)} className="p-2 bg-slate-800 hover:bg-yellow-600 rounded-lg text-white transition-colors" title="Edit"><Edit size={14} /></button>
                                <button onClick={() => handleDelete(module.id)} className="p-2 bg-slate-800 hover:bg-red-600 rounded-lg text-white transition-colors" title="Delete"><Trash2 size={14} /></button>
                            </div>

                            <div className="mb-4">
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${module.status === 'live' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/10' : 'border-yellow-500/20 text-yellow-500 bg-yellow-500/10'}`}>
                                    {module.status}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                            <p className="text-sm text-slate-400 mb-4 line-clamp-2">{module.description}</p>
                            <div className="text-[10px] text-slate-600 font-mono truncate mb-2">/{module.slug}</div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Franky Editor Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50 rounded-t-3xl">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                                <span className="text-blue-500">Franky</span> Editor
                            </h3>
                            <button onClick={() => setIsEditing(false)} className="text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
                        </div>

                        <div className="p-8 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSave} className="space-y-6">
                                {/* Core Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Project Title</label>
                                        <input
                                            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition-colors"
                                            placeholder="Ex: OmniMind Core"
                                            value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between">
                                            <span>Slug (URL)</span>
                                            <button type="button" onClick={generateSlug} className="text-blue-500 hover:text-blue-400 flex items-center gap-1"><RefreshCw size={10} /> Generate</button>
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-4 text-slate-600 font-mono text-sm">/</span>
                                            <input
                                                className="w-full bg-slate-950 border border-slate-800 p-4 pl-8 rounded-xl text-white focus:border-blue-500 outline-none font-mono text-sm transition-colors"
                                                placeholder="omnimind-core"
                                                value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Links */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                                        <select
                                            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none appearance-none"
                                            value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="dev">Development</option>
                                            <option value="beta">Beta Access</option>
                                            <option value="live">Live / Production</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live URL</label>
                                        <input
                                            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none font-mono text-sm"
                                            placeholder="https://..."
                                            value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Short Desc */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Short Description (Hero)</label>
                                    <textarea
                                        className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none resize-none h-24"
                                        placeholder="Brief hook for the landing card..."
                                        value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                {/* Rich Content */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between">
                                        <span>Full Presentation (Markdown)</span>
                                        <span className="text-slate-600 text-[10px]">* Supports headers, lists, bold, etc.</span>
                                    </label>
                                    <textarea
                                        className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none resize-none h-64 font-mono text-sm leading-relaxed"
                                        placeholder="# Main Feature\n\nDescribe the details here..."
                                        value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    />
                                </div>

                                {/* Media & Meta */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Video URL (YouTube/MP4)</label>
                                        <input
                                            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none font-mono text-sm"
                                            placeholder="https://youtube.com/..."
                                            value={formData.video_url} onChange={e => setFormData({ ...formData, video_url: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gallery Images (Comma sep)</label>
                                        <input
                                            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none font-mono text-sm"
                                            placeholder="url1.jpg, url2.png..."
                                            value={formData.gallery} onChange={e => setFormData({ ...formData, gallery: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Features List (One per line)</label>
                                        <textarea
                                            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none resize-none h-32 font-mono text-sm"
                                            placeholder="- Secure Encryption\n- AI Analysis\n- Real-time Sync"
                                            value={formData.features} onChange={e => setFormData({ ...formData, features: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tags (Comma sep)</label>
                                        <input
                                            className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white focus:border-blue-500 outline-none font-mono text-sm"
                                            placeholder="ai, crypto, web3..."
                                            value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                        />
                                    </div>
                                </div>

                            </form>
                        </div>

                        <div className="p-6 border-t border-slate-800 bg-slate-950/50 rounded-b-3xl">
                            <button
                                onClick={handleSave}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                            >
                                <Save size={18} /> Save & Publish
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
