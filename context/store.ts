import { create } from "zustand";

export enum AuthState {
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
  PENDING = "pending",
}

interface StoreState {
  auth_state: AuthState;
  credentials: ICustomer | null;
  account_type: "seller" | "customer" | null;
  setAuthState: (state: AuthState) => void;
  setCredentials: (credentials: ICustomer | null) => void;
  setAccountType: (type: "seller" | "customer" | null) => void;
}

const useStore = create<StoreState>((set) => ({
  auth_state: AuthState.UNAUTHENTICATED,
  credentials: null,
  account_type: null,
  setAuthState: (state: AuthState) => set({ auth_state: state }),
  setCredentials: (credentials: ICustomer | null) => set({ credentials }),
  setAccountType: (type: "seller" | "customer" | null) =>
    set({ account_type: type }),
}));

export default useStore;
