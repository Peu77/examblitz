import {GetServerSidePropsContext} from "next";
import {me} from "../../src/api";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    return {
        redirect: {
            destination: "/dashboard/home",
            permanent: false
        }
    }
}

const Index = () => {
    return <></>
}

export default Index