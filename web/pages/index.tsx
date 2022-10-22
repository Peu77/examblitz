import type {NextPage} from 'next'
import Nav from "../components/Nav";

const Home: NextPage = () => {
    return (
        <>
            <Nav links={[
                {link: "https://google.com", label: "google"},
                {link: "https://instagram.com", label: "instagram"},
            ]}/>
        </>
    )
}

export default Home
