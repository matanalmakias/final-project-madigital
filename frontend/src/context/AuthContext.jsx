import { createContext, useContext, useEffect, useState } from "react";
import isAdmin from "./../functions/isAdmin.model";
import authService from "./../services/auth.service";
import { SocketContext } from "./SocketContext";
export const AuthContext = createContext({
  isLoggedIn: false,
  login(token) {},
  logout() {},
  selfUser: {},
  isManager: Boolean,
  isModerator: Boolean,
});

export const AuthProvider = ({ children }) => {
  const [isAdminState, setIsAdminState] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(undefined);
  const [selfUser, setSelfUser] = useState();
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (isLoggedIn) {
      authService.getSelfUser().then((res) => setSelfUser(res.data));
    }
    socket.on("user", () => {
      authService.getSelfUser().then((res) => setSelfUser(res.data));
    });
    return () => {
      socket.off("user");
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const token = user.token;
      const roles = user.roles;
      login(token);
      setIsLoggedIn(true);
      //isAdminTest  ??
      let isAdminTest = isAdmin("ROLE_ADMIN", roles);

      if (isAdminTest) {
        setIsAdminState(true);
      }
      // isModerator ???
      let isModeratorTest = isAdmin("ROLE_MODERATOR", roles);

      if (isModeratorTest) {
        setIsModerator(true);
      }
      // isManager ???
      let isManagerTest = isAdmin("ROLE_MANAGER", roles);

      if (isManagerTest) {
        setIsManager(true);
      }
    }
  }, []);
  useEffect(() => {
    isLoggedIn === true
      ? localStorage.setItem("isLoggedIn", true)
      : localStorage.setItem("isLoggedIn", false);
  }, [isLoggedIn]);

  const login = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    setToken(token);
    return (
      <>
        <p>התחברת בהצלחה</p>
      </>
    );
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setToken(undefined);
    return (
      <>
        <p>התנתקת בהצלחה</p>
      </>
    );
  };
  const contextValues = {
    isLoggedIn,
    token,
    login,
    selfUser,
    logout,
    isModerator,
    isAdminState,
    isManager,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};
