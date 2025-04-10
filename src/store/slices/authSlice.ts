import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
  email: string;
  name?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate a successful login with mock user data
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      email: credentials.email,
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Anytown, USA',
      createdAt: new Date().toISOString(),
    };
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: { name: string; phone: string; address: string }) => {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return profileData;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user = {
            ...state.user,
            ...action.payload,
          };
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 