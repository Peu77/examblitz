import {RequestInit} from "next/dist/server/web/spec-extension/request";
import {createFetchRequest, useCreateRequestHook} from "../api";

export const findAllTests = async (init?: RequestInit) =>
    createFetchRequest("/test/", "GET", init);

export const useFindAllTests = () => useCreateRequestHook<unknown>(findAllTests)

export const deleteTest = async (id: string, init?: RequestInit) =>
    createFetchRequest(`/test/${id}`, "DELETE", init);

export const useDeleteTest = () => useCreateRequestHook<string>(deleteTest)