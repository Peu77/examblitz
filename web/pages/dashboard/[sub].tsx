import useUserStore from "../../src/stores/UserStore";
import {GetServerSidePropsContext} from "next";
import {findAllTests, me} from "../../src/api";
import {User} from "../../src/types";
import React, {useEffect, useMemo} from "react";
import DashboardLayout from "../../components/layouts/dashboardLayout";
import {useRouter} from "next/router";
import Home from "../../components/dashboard/subs/Home";
import Tests from "../../components/dashboard/subs/Tests";
import {Test} from "../../src/types/test";

interface SubResponse {
    props: any
}

interface Sub {
    name: string
    component: any,
    serverSideFunction: (content: GetServerSidePropsContext) => Promise<SubResponse>
}


const subs: Sub[] = [
    {
        name: "home",
        component: Home,
        serverSideFunction: async (context: GetServerSidePropsContext) => {
            const response = await findAllTests({
                headers: {
                    cookie: context.req.headers.cookie || ""
                }
            })

            if (!response.ok)
                return {props: {}}

            const tests: Test[] = await response.json()

            return {
                props: {
                    tests
                }
            }
        },
    },
    {
        name: "tests",
        component: Tests,
        serverSideFunction: async (context: GetServerSidePropsContext) => {
            return {
                props: {}
            }
        },
    }
]

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

    const sub = subs.find(sub => sub.name === context.query.sub)
    let subResponse: SubResponse = sub ? await sub.serverSideFunction(context) : {props: {}}

    let user = await response.json();
    return {
        props: {
            user,
            subProps: {
                ...subResponse.props
            }
        },
    }
}

interface DashboardProps {
    user: User,
    subProps: any
}

const Dashboard = (props: DashboardProps) => {
    const router = useRouter();
    const setUser = useUserStore((state: any) => state.setUser)
    const isUserSet = useMemo(() => {
        setUser(props.user)
        return true
    }, [])


    const sub = useMemo(() => {
        return subs.find(sub => sub.name === router.query.sub)
    }, [router])

    return (
        <div>
            <DashboardLayout>
                {sub && isUserSet ? <sub.component {...props.subProps}/> : <></>}
            </DashboardLayout>
        </div>
    )
}

export default Dashboard