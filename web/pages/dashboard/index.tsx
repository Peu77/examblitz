import {GetServerSidePropsContext} from "next";
import {me} from "../../src/requests/userRequests";
import {User} from "../../src/types";

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

    return {
        props: {
            user: (await response.json()) as User
        }
    }
}

interface HomeProps {
    user: User
}

export default function Index(_: HomeProps) {

    return (
        <>
            Home Page.
        </>
    )
}