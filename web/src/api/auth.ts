import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {TokenResponse, User} from '../types'

export const authApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/auth/'}),
    endpoints: (builder) => ({
        register: builder.mutation<User, { name: string, password: string }>({
            query: ({name, password}) => ({
                url: `public/register`,
                method: "POST",
                body: {name, password}
            }),
        }),
        login: builder.mutation<TokenResponse, { name: string, password: string }>({
            query: ({name, password}) => ({
                url: `public/login`,
                method: "POST",
                body: {name, password}
            }),
        }),
    }),
})

export const {useRegisterMutation, useLoginMutation} = authApi