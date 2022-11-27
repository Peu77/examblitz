import type {NextPage} from 'next'
import Navbar from "../components/navbar";

const Home: NextPage = () => {
    return (
        <>
            <Navbar links={[
                {link: "https://google.com", label: "google"},
                {link: "https://instagram.com", label: "instagram"},
                {link: "/account/login", label: "login"},
            ]}/>
        </>
    )
}

export default Home
