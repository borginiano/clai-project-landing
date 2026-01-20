import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        // Safety Timeout: Force stop loading after 5s if Supabase doesn't respond
        const timer = setTimeout(() => {
            if (mounted && loading) {
                console.warn("Auth timeout - Forcing app load");
                setLoading(false);
            }
        }, 5000);

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!mounted) return;
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setLoading(false);
            }
        }).catch(err => {
            console.error("Session check failed:", err);
            if (mounted) setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!mounted) return;
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
                <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-blue-500" size={40} />
                        <p className="text-slate-400 text-sm tracking-widest uppercase animate-pulse">Initializing System...</p>
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
