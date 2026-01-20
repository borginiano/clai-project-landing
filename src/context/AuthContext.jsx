import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) fetchProfile(session.user.id);
            else setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                await fetchProfile(session.user.id);
            } else {
                setProfile(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
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
            // Create profile manually if trigger fails or just to be safe
            const { error: profileError } = await supabase.from('profiles').insert([
                { id: data.user.id, username, role: 'user' } // Default role
            ]);
            if (profileError) console.error("Error creating profile:", profileError);
        }

        return { data, error };
    };

    const signOut = () => supabase.auth.signOut();

    return (
        <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
