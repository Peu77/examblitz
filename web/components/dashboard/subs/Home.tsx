import {Card, Image, Text, Badge, Button, Group, Grid} from '@mantine/core';
import {Test} from "../../../src/types/test";

interface HomeProps {
    tests: Test[]
}

export default function Home(props: HomeProps) {
    console.log("tests", props.tests)

    if (!props.tests)
        return <></>
    return (
        <>
            <Text weight={800} size="xl" mt="lg">
                You&apos;ve won a million dollars in cash!
            </Text>
            <Grid style={{
                margin: 0
            }}>
                {props.tests.map((test, i_) => (
                    <Grid.Col md={6} lg={3} key={test.id}>
                        <Card
                            shadow="sm"
                            p="xl"
                            component="div"
                        >
                            <Card.Section>
                                <Image
                                    src="https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                                    height={160}
                                    alt="No way!"
                                />
                            </Card.Section>

                            <Text weight={500} size="lg" mt="md">
                                You&apos;ve won a million dollars in cash!
                            </Text>

                            <Text mt="xs" color="dimmed" size="sm">
                                Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                            </Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    );
}