import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = (children) => {
  const initialize = useMemo(() => {
    const data = localStorage.getItem("userInfo");
    if (data && data === "undefine") {
      try {
        const parseData = JSON.parse(data);
        return {
          user: parseData?.user || null,
          token: parseData?.token || ""
        };
      } catch (error) {
        console.log(error);
        return { user: null, token: null };
      }
    }
    return { user: null, token: null };
  }, []);
  const [auth, setAuth] = useState(initialize);

  const updateAuth = useCallback((newUser) => {
    setAuth((prev) => {
      return { ...prev, ...newUser };
    });

    try {
      localStorage.setItem("userInfo", newUser);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const contextValue = useMemo((e) => [auth, updateAuth], [auth, updateAuth]);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
