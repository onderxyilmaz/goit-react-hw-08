import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, updateContact } from './operations';
import { logout } from '../auth/operations';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addContact.pending, state => {
                state.isLoading = true;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteContact.pending, state => {
                state.isLoading = true;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = state.items.filter(contact => contact.id !== action.payload.id);
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, state => {
                state.items = [];
                state.error = null;
                state.isLoading = false;
            })
            .addCase(updateContact.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const contactsReducer = contactsSlice.reducer; 