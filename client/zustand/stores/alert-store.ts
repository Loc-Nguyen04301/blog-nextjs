import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AlertState {
    errors: string[];
    success: string | null;
    addError: (message: string) => void;
    clearErrors: () => void;
    setSuccess: (message: string) => void;
    clearSuccess: () => void;
}

export const useAlertStore = create<AlertState>()(
    devtools((set) => ({
        errors: [],
        success: "",

        addError: (message) =>
            set((state) => ({ errors: [message, ...state.errors] })),

        clearErrors: () => set({ errors: [] }),

        setSuccess: (message) => set({ success: message }),

        clearSuccess: () => set({ success: null }),
    }), { name: 'AlertStore' })
);
