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
        errors: ['123', '456'],
        success: "",

        addError: (message) =>
            set((state) => ({ errors: [...state.errors, message] })),

        clearErrors: () => set({ errors: [] }),

        setSuccess: (message) => set({ success: message }),

        clearSuccess: () => set({ success: null }),
    }), { name: 'AlertStore' })
);
