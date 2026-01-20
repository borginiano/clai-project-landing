import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const [debugInfo, setDebugInfo] = useState("Initializing Auth...");

    useEffect(() => {
        let mounted = true;

        // Debug: Log config presence
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        setDebugInfo(prev => prev + `\nEnv: URL=${url ? 'OK' : 'MISSING'}, KEY=${key ? 'OK' : 'MISSING'}`);

        // Safety Timeout
        const timer = setTimeout(() => {
            if (mounted && loading) {
                setDebugInfo(prev => prev + "\nTIMEOUT: Supabase did not respond in 5s. Forcing load.");
                setLoading(false);
            }
        }, 5000);

        supabase.auth.getSession().then(({ data, error }) => {
            if (!mounted) return;
            if (error) {
                setDebugInfo(prev => prev + `\nError getting session: ${error.message}`);
                console.error("Auth Session Error:", error);
            } else {
                setDebugInfo(prev => prev + `\nSession Check: ${data.session ? 'Found User' : 'No User'}`);
                setUser(data?.session?.user ?? null);
                if (data?.session?.user) {
                    fetchProfile(data.session.user.id);
                } else {
                    setLoading(false);
                }
            }
        }).catch(err => {
            if (mounted) setDebugInfo(prev => prev + `\nCRITICAL FAIL: ${err.message}`);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!mounted) return;
            // setDebugInfo(prev => prev + `\nAuth Event: ${event}`); // Verbose
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            clearTimeout(timer);
            subscription.unsubscribe();
        };
    }, []);

    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error);
            }

            setProfile(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        return supabase.auth.signInWithPassword({ email, password });
    };

    const signUp = async (email, password, username) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) return { error };

        if (data.user) {
            const { error: profileError } = await supabase.from('profiles').insert([
                { id: data.user.id, username, role: 'user' }
            ]);
            if (profileError) console.error("Error creating profile:", profileError);
        }

        return { data, error };
    };

    const signOut = () => supabase.auth.signOut();

    return (
        <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
            {loading ? (
                <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4 font-mono text-xs">
                    <Loader2 className="animate-spin mb-4" size={32} />
                    <p className="mb-4 text-xl font-bold">Loading Application...</p>
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded max-w-lg w-full whitespace-pre-wrap text-slate-400">
                        {debugInfo}
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
