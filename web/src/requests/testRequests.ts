import {RequestInit} from "next/dist/server/web/spec-extension/request";
import {createFetchRequest, createFetchRequestWithBody, useCreateRequestHook} from "../api";
import CreateTestDto from "../types/dto/CreateTestDto";

export const findAllTests = async (init?: RequestInit) =>
    createFetchRequest("/test/", "GET", init);

export const useFindAllTests = () => useCreateRequestHook<unknown>(findAllTests)

export const deleteTest = async (id: string, init?: RequestInit) =>
    createFetchRequest(`/test/${id}`, "DELETE", init);

export const useDeleteTest = () => useCreateRequestHook<string>(deleteTest)

export const createTest = async (test: CreateTestDto, init?: RequestInit) =>
    createFetchRequestWithBody("/test/create", "POST", test, init);

export const useCreateTest = (onSuccess: (data: any) => any) => useCreateRequestHook<CreateTestDto>(createTest, onSuccess)