import {findAllTests, useDeleteTest} from "../../src/requests/testRequests";
import {useState} from "react";
import {openConfirmModal} from "@mantine/modals";
import {Button, Card, Grid, Group, Text} from "@mantine/core";
import {showNotification} from "@mantine/notifications";
import {Test} from "../../src/types/test";
import {GetServerSidePropsContext} from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const response = await findAllTests({
        headers: {
            cookie: context.req.headers.cookie || ""
        }
    })

    if (!response.ok)
        return {
            redirect: {
                destination: "/account/login",
                permanent: false
            }
        }

    return {
        props: {
            tests: (await response.json()) as Test[]
        }
    }
}

interface TestProps {
    tests: Test[]
}

export default function Tests(props: TestProps) {
    const {fn: deleteTest} = useDeleteTest()
    const [tests, setTests] = useState(props.tests)

    const openModal = (testId: string, title: string) => openConfirmModal({
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
            showNotification({
                title: 'Notification',
                message: 'You deleted the test ' + title,
                color: "green",
            })
            setTests(tests.filter(test => test.id !== testId))
        },
    });

    return (
        <div>
            <Group>
                <Text weight={800} size="xl">
                    Your Tests
                </Text>
            </Group>

            <Grid style={{
                margin: 0
            }}>
                {tests.map((test, _) => (
                    <Grid.Col md={4} lg={18} key={test.id}>
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Group mb="xs">
                                <Text weight={500}>{test.title}</Text>
                            </Group>

                            <Text size="sm" color="dimmed">
                                {test.description}
                            </Text>

                            <Button variant="light" fullWidth color="red" radius="md"
                                    onClick={() => openModal(test.id, test.title)}>Delete Test</Button>
                            <Button variant="light" fullWidth color="blue" radius="md">Start Test</Button>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
}