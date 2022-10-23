import useUserStore from "../../../src/stores/UserStore";

const Home = (props: any) => {
    const user = useUserStore((state: any) => state.user)

    return (
        <h1>Home {props.homeistcool.toString()} User: {user.name}</h1>
    )
}

export default Home