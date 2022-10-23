import create from 'zustand';
import {User} from "../types";

const useUserStore = create((set) => ({
    user: null,
    setUser: (user: User) => set((state: { user: User }) => ({
            user: user
        })
    ),
    logout: () => set((state: { user: User }) => ({
        user: null
    }))
}));

export default useUserStore;
