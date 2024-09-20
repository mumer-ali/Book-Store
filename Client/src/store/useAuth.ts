import { create } from "zustand";

// Local Storage (Persist in Browser)
const useAuth = create((set) => {
  const storedUser = localStorage.getItem("bookshelfUser");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  return {
    user: initialUser,
    setUser: (user) => {
      set(() => ({
        user: user,
      }));
      localStorage.setItem("bookshelfUser", JSON.stringify(user));
    },
  };
});

export default useAuth;

// Session Storage (Deleted upon Browser Closure)
// const useAuth = create((set) => {
//   const storedUser = sessionStorage.getItem('bookshelfUser');
//   const initialUser = storedUser ? JSON.parse(storedUser) : null;
//   return {
//     user: initialUser,
//     setUser: (user) => {
//       set(() => ({
//         user: user,
//       }));
//       sessionStorage.setItem('bookshelfUser', JSON.stringify(user));
//     },
//   };
// });

// export default useAuth;
