import {User} from "../../src/types";
import {GetServerSidePropsContext} from "next";
import {me} from "../../src/api";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const response = await me({
        headers: {
            cookie: context.req.headers.cookie || ""
        }
    })

    const error = !response.ok
    let user = null

    if (!error) {
        user = await response.json()
    }

    return {
        props: {
            error,
            user
        },
    }
}

interface DashboardProps {
    error: boolean,
    user: User
}


const Dashboard = (props: DashboardProps) => {
    return (
        <>
            <h1>error: {props.error.toString()}</h1>
            <h1 onClick={() => {
            }}>name: {props.user.name}</h1>
        </>
    )
}

export default Dashboard