import {RequestInit} from "next/dist/server/web/spec-extension/request";
import {createFetchRequestWithBody, useCreateRequestHook} from "../api";

/**
 * This adds a cookie to authorize
 * @param z The body.
 * @param init Make the request more specific.
 */
export const login = async (z: { name: string, password: string }, init?: RequestInit) =>
    createFetchRequestWithBody("/auth/public/login", "POST", z, init);

export const useLogin = () => useCreateRequestHook<{ name: string, password: string }>(login)

/**
 * This creates a new user, and adds the cookie
 * @param z The body.
 * @param init Make the request more specific.
 */
export const register = async (z: { name: string, password: string }, init?: RequestInit) =>
    createFetchRequestWithBody("/auth/public/register", "POST", z, init);

export const useRegister = () => useCreateRequestHook<{ name: string, password: string }>(register)
