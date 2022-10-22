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
import {useRef} from "react";
import {useRegisterMutation} from "../../src/api/auth";
import {IconAlertCircle} from "@tabler/icons";

const Register = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // Mutations
    const [register, result] = useRegisterMutation()

    return (
        <Container size={420} my={40}>
            <LoadingOverlay visible={result.isLoading} overlayBlur={2}/>

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
                <LoadingOverlay visible={result.isLoading} overlayBlur={2}/>

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
