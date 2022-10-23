import useUserStore from "../../src/stores/UserStore";
import {GetServerSidePropsContext} from "next";
import {me} from "../../src/api";
import {User} from "../../src/types";
import React, {useEffect, useMemo} from "react";
import DashboardLayout from "../../components/layouts/dashboardLayout";
import {useRouter} from "next/router";
import Home from "../../components/dashboard/subs/Home";
import Tests from "../../components/dashboard/subs/Tests";
import {any} from "prop-types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const response = await me({
        headers: {
            cookie: context.req.headers.cookie || ""
        }
    })

    if (!response.ok)
        return {
            redirect: {
                destination: "/account/login",
                permanent: false
            }
        }

    let user = await response.json();
    return {
        props: {
            user
        },
    }
}

interface DashboardProps {
    user: User
}

const Dashboard = (props: DashboardProps) => {
    const router = useRouter();

    const setUser = useUserStore((state: any) => state.setUser)
    setUser(props.user)

    const subs = {
        "home": <Home/>,
        "tests": <Tests/>
    }

    const sub = useMemo(() => {
        // @ts-ignore
        return subs[router.query.sub as string] || <Home/>
    }, [router])

    return (
        <div>
            <DashboardLayout>
                {sub}
            </DashboardLayout>
        </div>
    )
}

export default Dashboard