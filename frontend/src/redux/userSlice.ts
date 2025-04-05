import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string | null;
    email: string;
}

const initialState: UserState = {
    id: null,
    email: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.id = null;
            state.email = "";
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
