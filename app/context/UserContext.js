"use client"; // Mark this as a Client Component

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          console.log("Fetched User Data:", data.user); 
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


  return (
    <UserContext.Provider value={{ user, loading }}>{children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);