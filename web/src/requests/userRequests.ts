import {RequestInit} from "next/dist/server/web/spec-extension/request";
import {createFetchRequest, useCreateRequestHook} from "../api";

/**
 * The returns information about the current user
 * @param init Make the request more specific.
 */
export const me = async (init?: RequestInit) =>
    createFetchRequest("/auth/me", "POST", init);

export const useMe = () => useCreateRequestHook<unknown>(me)