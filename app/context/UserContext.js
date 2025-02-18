"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { jwtVerify } from "jose";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        if (!token) {
          setCurrentUser(null);
          setLoading(false);
          return;
        }

        // Ensure JWT secret is defined
        const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET;
        if (!secretKey) {
          console.error("JWT_SECRET is missing!");
          setLoading(false);
          return;
        }

        const secret = new TextEncoder().encode(secretKey);
        const { payload } = await jwtVerify(token, secret);

        //console.log("Decoded User:", payload);
        setCurrentUser(payload); // Store user data including role
      } catch (error) {
        console.error("JWT Verification Failed:", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Logout function
  const logout = () => {
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, loading, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use user context
export const useUser = () => useContext(UserContext);
