import { createContext,useState } from 'react';

export const UserPostContext = createContext();

export const UserPostProvider = ({ children }) => {
  const [userPosts, setUserPosts] = useState([]);

  return (
    <UserPostContext.Provider value={{ userPosts, setUserPosts }}>
      {children}
    </UserPostContext.Provider>
  );
};