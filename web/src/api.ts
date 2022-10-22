/**
 * Every request should have this as init base
 */
import {useState} from "react";

/**
 * Everything a request should have
 */
const BASE_INIT: RequestInit = {
    credentials: "include"
}

/**
 * This converts a simple function to a hook, that will use states
 * to emit the result (e.g. data)
 * @param fn The function to be converted
 */
function createRequestHook<T extends unknown>(fn: (...args: any) => any): {
    fn: (args: T) => void,
    result: {
        loading: boolean,
        error: boolean,
        data: ReturnType<typeof fn> | null
    }
} {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<ReturnType<typeof fn> | null>(null)

    return {
        fn: (args: T) => {
            fn(args).then((response: Response) => {
                setLoading(false)

                if (!response.ok)
                    return setError(true);

                if (response.headers.get("Content-Length") !== "0")
                    response.json().then(json => setData(json))
            });
        },
        result: {loading, error, data}
    }
}

/**
 * This adds a cookie to authorize
 * @param z The body.
 */
export async function login(z: { name: string, password: string }) {
    return fetch("/api/auth/public/login", {
        ...BASE_INIT,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(z)
    })
}

export const useLogin = () => createRequestHook<{ name: string, password: string }>(login)

/**
 * This creates a new user, and adds the cookie
 * @param z The body.
 */
export async function register(z: { name: string, password: string }) {
    return fetch("/api/auth/public/register", {
        ...BASE_INIT,
        method: "POST",
        body: JSON.stringify(z)
    })
}

export const useRegister = () => createRequestHook<{ name: string, password: string }>(register)

export async function me(init?: RequestInit) {
    return fetch("/api/auth/me", {
        ...BASE_INIT,
        ...init
    })
}

export const useMe = () => createRequestHook<unknown>(me)