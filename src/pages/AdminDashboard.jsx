import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Plus, Trash2, Edit, Save, X, Loader2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'dev',
        url: '',
        image_url: '',
        tags: ''
    });

    useEffect(() => {
        if (profile && profile.role !== 'admin') {
            navigate('/'); // Redirect non-admins
        }
        fetchModules();
    }, [profile, navigate]);

    const fetchModules = async () => {
        const { data, error } = await supabase.from('modules').select('*').order('created_at', { ascending: false });
        if (error) console.error(error);
        else setModules(data);
        setLoading(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        };

        const { error } = await supabase.from('modules').insert([formattedData]);
        if (error) alert(error.message);
        else {
            setFormData({ title: '', description: '', status: 'dev', url: '', image_url: '', tags: '' });
            setIsEditing(false);
            fetchModules();
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        const { error } = await supabase.from('modules').delete().match({ id });
        if (error) alert(error.message);
        else fetchModules();
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">AD</div>
                        <div>
                            <h1 className="text-xl font-bold text-white tracking-tight uppercase">Admin Panel</h1>
                            <p className="text-[10px] text-slate-400 font-mono tracking-widest">Logged as: {profile?.username || user?.email}</p>
                        </div>
                    </div>
                    <button onClick={handleSignOut} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"><LogOut size={20} /></button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2"><LayoutGrid className="text-blue-500" /> Deployment Modules</h2>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
                    >
                        <Plus size={16} /> Add Module
                    </button>
                </div>

                {/* Module List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map(module => (
                        <motion.div
                            layout
                            key={module.id}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/30 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${module.status === 'live' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/10' : 'border-yellow-500/20 text-yellow-500 bg-yellow-500/10'}`}>
                                    {module.status}
                                </span>
                                <button onClick={() => handleDelete(module.id)} className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                            <p className="text-sm text-slate-400 mb-4 line-clamp-2">{module.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {module.tags?.map(tag => (
                                    <span key={tag} className="text-[9px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded-md border border-slate-800">#{tag}</span>
                                ))}
                            </div>
                            <div className="text-[10px] text-slate-600 font-mono truncate">{module.url}</div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-lg shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white uppercase">New Module</h3>
                            <button onClick={() => setIsEditing(false)} className="text-slate-500 hover:text-white"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <input
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:border-blue-500 outline-none"
                                placeholder="Title"
                                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <textarea
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:border-blue-500 outline-none resize-none h-24"
                                placeholder="Description"
                                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:border-blue-500 outline-none"
                                    value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="dev">En Desarrollo</option>
                                    <option value="beta">Beta</option>
                                    <option value="live">Live</option>
                                </select>
                                <input
                                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:border-blue-500 outline-none"
                                    placeholder="URL"
                                    value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })}
                                />
                            </div>
                            <input
                                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-sm text-white focus:border-blue-500 outline-none"
                                placeholder="Tags (comma separated)"
                                value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            />
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl mt-4">Save Module</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
