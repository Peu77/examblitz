import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import Link from "next/link";
import {NextLink} from "@mantine/next";
import {useRef} from "react";

const Register = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function register() {
        fetch("/api/auth/public/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameRef.current?.value,
                password: passwordRef.current?.value,
            })
        }).then(response => response.json()).then(data => {
            console.log(data)
        })
    }


    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
            >
                Hello, great to see you!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do already have an account?{' '}
                <Link href={"/account/login"}>
                    <Anchor component={"a"} size="sm">
                        Login
                    </Anchor>
                </Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Name" placeholder="John Doe" required ref={nameRef}/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md" ref={passwordRef}/>
                <Group position="apart" mt="md">
                    <Checkbox label="Remember me"/>
                    <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button fullWidth mt="xl" onClick={register}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}

export default Register;
