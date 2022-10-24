import {Card, Image, Text, Badge, Button, Group, Grid} from '@mantine/core';
import {Test} from "../../../src/types/test";
import {openConfirmModal} from "@mantine/modals";
import {useDeleteTest} from "../../../src/requests/testRequests";

interface HomeProps {
    tests: Test[]
}

export default function Home(props: HomeProps) {
    const {fn: deleteTest, result} = useDeleteTest()

    const openModal = (testId: string) => openConfirmModal({
        title: 'Please confirm your action',
        overlayBlur: 3,
        children: (
            <Text size="sm">
                This action is so important that you are required to confirm it with a modal. Please click
                one of these buttons to proceed.
            </Text>
        ),
        labels: {confirm: 'Confirm', cancel: 'Cancel'},
        onCancel: () => {
        },
        onConfirm: () => {
            deleteTest(testId)
        },
    });

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
                    <Grid.Col md={6} lg={8} key={test.id}>
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
                                {test.id}
                            </Text>

                            <Group mt="xl">
                                <Button color="green">
                                    Start
                                </Button>

                                <Button color="red" onClick={() => openModal(test.id)}>
                                    Delete
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    );
}