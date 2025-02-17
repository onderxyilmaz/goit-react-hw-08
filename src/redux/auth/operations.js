import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Doğru API URL'ini kullanalım
axios.defaults.baseURL = 'https://connections-api.goit.global';

// Token işlemleri için yardımcı fonksiyonlar
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

// Thunk'lar
export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('/users/signup', credentials);
            setAuthHeader(res.data.token);
            return res.data;
        } catch (error) {
            // Daha detaylı hata mesajları
            if (error.response?.status === 400) {
                return thunkAPI.rejectWithValue('Bu email adresi zaten kullanımda');
            }
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Kayıt işlemi başarısız oldu'
            );
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const res = await axios.post('/users/login', credentials);
            setAuthHeader(res.data.token);
            return res.data;
        } catch (error) {
            // Daha açıklayıcı hata mesajları
            if (error.response?.status === 400) {
                return thunkAPI.rejectWithValue('Email veya şifre hatalı');
            }
            return thunkAPI.rejectWithValue(
                'Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.'
            );
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        await axios.post('/users/logout');
        clearAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            return thunkAPI.rejectWithValue('Unable to fetch user');
        }

        try {
            setAuthHeader(persistedToken);
            const res = await axios.get('/users/current');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
); 