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
import Link from "next/link";
import {useEffect, useRef} from "react";
import {IconAlertCircle} from "@tabler/icons";
import {useRegister} from "../../src/requests/authRequests";
import {useRouter} from "next/router";

const Register = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // Used to redirect to the dashboard
    const router = useRouter();

    // Mutations
    const {fn: register, result} = useRegister()

    useEffect(() => {
        router.prefetch("/dashboard").then(_ => ({}))
    })

    useEffect(() => {
        if (result.done && !result.loading && !result.error)
            router.push("/dashboard").then(_ => ({}))
    }, [result.loading])

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
            >
                New here?
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Already have an account?{' '}

                <Link href={"/account/login"}>
                    <Anchor component={"a"} size="sm">
                        Sign In
                    </Anchor>
                </Link>
            </Text>

            {
                result.error && (
                    <Alert icon={<IconAlertCircle size={16}/>} title="Bummer!" color="red">
                        Something went wrong. Please try again, or contact an administrator.
                    </Alert>
                )
            }

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{position: "relative"}}>
                <LoadingOverlay visible={result.loading} overlayBlur={2}/>

                <TextInput label="Name" placeholder="John Doe" required ref={nameRef}/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md" ref={passwordRef}/>

                <Button fullWidth mt="xl" onClick={() => register({
                    name: nameRef.current?.value || "",
                    password: passwordRef.current?.value || ""
                })}>
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}

export default Register;
