import {useState} from "react";
import {RequestInit} from "next/dist/server/web/spec-extension/request";
import merge from "deepmerge";

/**
 * Every request should have this as init base
 */
const BASE_INIT: RequestInit = {
    credentials: "include"
}

/**
 * This is what every request starts with.
 */
const BASE_URL = process.env.API_URL ?? "/api"

/**
 * This converts a simple function to a hook, that will use states
 * to emit the result (e.g. data)
 * @param fn The function to be converted
 */
export function useCreateRequestHook<T extends unknown>(fn: (...args: any) => any): {
    fn: (args: T) => void,
    result: {
        loading: boolean,
        error: boolean,
        done: boolean,
        data: ReturnType<typeof fn> | null
    }
} {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);
    const [data, setData] = useState<ReturnType<typeof fn> | null>(null)

    return {
        fn: (args: T) => {
            setLoading(true);
            setError(true);
            fn(args).then((response: Response) => {
                setLoading(false)
                setDone(true);

                if (response.ok)
                    return setError(false);

                if (response.headers.get("Content-Length") !== "0")
                    response.json().then(json => setData(json))
            });
        },
        result: {loading, error, data, done}
    }
}

/**
 * Creating a fetch request.
 * @param url The url the fetch will aim at.
 * @param method The method the fetch will use.
 * @param init Make the request more specific.
 */
export function createFetchRequest(url: string, method: string, init?: RequestInit) {
    return fetch(BASE_URL + url, merge({
        ...BASE_INIT,
        method: method,
    }, init ?? {}))
}

/**
 * Creating a fetch request with a body and the content-type set to
 * "application/json".
 * @param url The url the fetch will aim at.
 * @param method The method the fetch will use.
 * @param body The body that we will transmit as json.
 * @param init Make the request more specific.
 */
export function createFetchRequestWithBody(url: string, method: string, body: any, init?: RequestInit) {
    return fetch(BASE_URL + url, merge({
        ...BASE_INIT,
        method: method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }, init ?? {}))
}
