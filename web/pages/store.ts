import {configureStore, createSlice} from '@reduxjs/toolkit'
// ...

// create user reducer
const user = createSlice({
    name: 'user',
    initialState: {
        name: 'John Doe',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
})

export const store = configureStore({
    reducer: {
        user: user.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch