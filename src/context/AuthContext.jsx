import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { SCHOOL_CONFIG } from '../constants/formConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || null);
  const [userData, setUserData] = useState({
    school: localStorage.getItem('school') || null,
    department: localStorage.getItem('department') || null,
    faculty_id: localStorage.getItem('faculty_id') || null,
    hasHod: localStorage.getItem('hasHod') === 'true',
  });

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          const meta = session.user.user_metadata || {};
          const role = meta.role || localStorage.getItem('role');
          const school = meta.school || localStorage.getItem('school');
          const hasHod = school ? (SCHOOL_CONFIG[school]?.hasHod !== false) : true;
          
          setUserRole(role);
          setUserData({
            school: school,
            department: meta.department || localStorage.getItem('department'),
            faculty_id: meta.faculty_id || localStorage.getItem('faculty_id'),
            hasHod: hasHod,
          });
        }
      })
      .catch(err => {
        console.error("Supabase session error:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const meta = session.user.user_metadata || {};
        const role = meta.role || localStorage.getItem('role');
        const school = meta.school || localStorage.getItem('school');
        const hasHod = school ? (SCHOOL_CONFIG[school]?.hasHod !== false) : true;
        
        setUserRole(role);
        setUserData({
          school: school,
          department: meta.department || localStorage.getItem('department'),
          faculty_id: meta.faculty_id || localStorage.getItem('faculty_id'),
          hasHod: hasHod,
        });

        // Update localStorage for backward compatibility or persistence
        if (role) localStorage.setItem('role', role);
        if (school) localStorage.setItem('school', school);
        if (meta.department) localStorage.setItem('department', meta.department);
        if (meta.faculty_id) localStorage.setItem('faculty_id', meta.faculty_id);
        localStorage.setItem('hasHod', hasHod ? 'true' : 'false');
        if (session.access_token) localStorage.setItem('token', session.access_token);
      } else {
        setUser(null);
        setUserRole(null);
        setUserData({ school: null, department: null, faculty_id: null, hasHod: false });
        localStorage.clear();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const meta = data.user.user_metadata || {};
    const role = meta.role || 'faculty'; 
    const school = meta.school || null;
    const hasHod = school ? (SCHOOL_CONFIG[school]?.hasHod !== false) : true;

    setUserRole(role);
    setUserData({
      school: school,
      department: meta.department || null,
      faculty_id: meta.faculty_id || null,
      hasHod: hasHod,
    });

    localStorage.setItem('role', role);
    if (school) localStorage.setItem('school', school);
    if (meta.department) localStorage.setItem('department', meta.department);
    if (meta.faculty_id) localStorage.setItem('faculty_id', meta.faculty_id);
    localStorage.setItem('hasHod', hasHod ? 'true' : 'false');
    localStorage.setItem('token', data.session.access_token);

    return data;
  };

  const signup = async (email, password, metadata) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUserRole(null);
    setUserData({ school: null, department: null, faculty_id: null });
    localStorage.clear();
  };

  const resetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, userRole, userData, loading, login, signup, logout, resetPassword, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const USERS = {
  faculty: { role: "faculty", name: "Faculty" },
  hod: { role: "hod", name: "HOD" },
  dean: { role: "dean", name: "Dean" },
  director: { role: "director", name: "Director" },
  vc: { role: "vc", name: "Vice Chancellor" },
};
