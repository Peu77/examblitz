import {User} from "../../src/types";
import {GetServerSidePropsContext} from "next";
import {me} from "../../src/api";
import style from "./dashboard.module.scss"

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
    return (
        <div className={style.container}>
            <h1>name: {props.user.name}</h1>
        </div>
    )
}

export default Dashboard