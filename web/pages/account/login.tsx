import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button, LoadingOverlay, Alert,
} from '@mantine/core';
import {IconAlertCircle} from '@tabler/icons';
import Link from "next/link";
import {useEffect, useRef} from "react";
import {useLogin} from "../../src/api";
import {useRouter} from "next/router";

const Login = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // Used to redirect to the dashboard
    const router = useRouter();

    // Mutations
    const {fn: login, result} = useLogin()

    useEffect(() => {
        router.prefetch("/dashboard").then(_ => ({}))
    })


    useEffect(() => {
        console.log(result.error)

        if (result.done && !result.error)
            router.push("/dashboard").then(_ => ({}))
    }, [result.loading])


    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
            >
                Welcome back!
            </Title>

            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}

                <Link href={"/account/register"}>
                    <Anchor component={"a"} size="sm">
                        Sign Up
                    </Anchor>
                </Link>
            </Text>

            {
                result.error && (
                    <Alert icon={<IconAlertCircle size={16}/>} title="Bummer!" color="red">
                        Authentication Failed. Please check your credentials, otherwise contact an administrator.
                    </Alert>
                )
            }

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{position: "relative"}}>
                <LoadingOverlay visible={result.loading} overlayBlur={2}/>

                <TextInput label="Name" placeholder="John Doe" required ref={nameRef}/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md" ref={passwordRef}/>

                <Button fullWidth mt="xl" onClick={() => login({
                    name: nameRef.current?.value || "",
                    password: passwordRef.current?.value || ""
                })}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}

export default Login;
