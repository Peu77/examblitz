import {findAllTests, useCreateTest, useDeleteTest} from "../../src/requests/testRequests";
import {ComponentPropsWithoutRef, forwardRef, useState} from "react";
import {openConfirmModal} from "@mantine/modals";
import {Button, Card, Drawer, Grid, Group, Text, TextInput, Paper, Container, Textarea, Select} from "@mantine/core";
import {showNotification} from "@mantine/notifications";
import {GetServerSidePropsContext} from "next";
import Image from "next/image";
import lockIcon from "../../assets/lock.svg";
import lockOpenIcon from "../../assets/lock-open.svg";
import {Test, Question} from "../../src/types/test";
import {useForm} from '@mantine/form';

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

interface SelectVisibilityItemProps extends ComponentPropsWithoutRef<'div'> {
    icon: string;
    label: string;
    description: string;
}

const SelectVisibilityItem = forwardRef<HTMLDivElement, SelectVisibilityItemProps>(
    ({icon, label, description, ...others}: SelectVisibilityItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Image src={icon} width={20} height={20}/>

                <div>
                    <Text size="sm">{label}</Text>
                    <Text size="xs" style={{opacity: 0.65}}>
                        {description}
                    </Text>
                </div>
            </Group>
        </div>
    )
);

export default function Tests(props: TestProps) {
    const {fn: deleteTest} = useDeleteTest()
    const {fn: createTest} = useCreateTest((test) => {
        console.log("create test", test)
    })
    const createTestForm = useForm({
        initialValues: {
            title: '',
            description: '',
            visibility: '',
        }
    })

    const [tests, setTests] = useState(props.tests)
    const [openCreateTestDrawer, setOpenCreateTestDrawer] = useState(false)

    const openModalDeleteTest = (testId: string, title: string) => openConfirmModal({
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
            <Drawer opened={openCreateTestDrawer} onClose={() => setOpenCreateTestDrawer(false)} size={"lg"}
                    withCloseButton={false}>
                <Container mt={"md"}>
                    <Text size="xl">Create a new test</Text>
                    <TextInput label="Title" placeholder="Title" required {...createTestForm.getInputProps("title")}/>
                    <Textarea label="Description" placeholder="Description" mt="md" minRows={3} maxRows={5}
                              required {...createTestForm.getInputProps("description")}/>
                    <Select label="visibility" placeholder="visibility" mt="md"
                            itemComponent={SelectVisibilityItem} {...createTestForm.getInputProps("visibility")}
                            data={[
                                {
                                    label: 'Public',
                                    value: 'PUBLIC',
                                    description: 'Everyone can see this test',
                                    icon: lockOpenIcon,
                                },
                                {
                                    label: 'Private',
                                    value: 'PRIVATE',
                                    description: 'Only you can see this test',
                                    icon: lockIcon
                                },
                            ]} required/>

                    <Group align={"center"} grow>
                        <Button mt="md" color="teal" variant="outline"
                                onClick={() => {
                                    createTest(createTestForm.values)
                                }}>Create</Button>
                        <Button mt="md" color="red" variant="outline"
                                onClick={() => setOpenCreateTestDrawer(false)}>Cancel</Button>
                    </Group>
                </Container>
            </Drawer>

            <Group>
                <Text weight={800} size="xl">
                    Your Tests
                </Text>
                <Button onClick={() => setOpenCreateTestDrawer(true)}>Create</Button>
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
                                    onClick={() => openModalDeleteTest(test.id, test.title)}>Delete Test</Button>
                            <Button variant="light" fullWidth color="blue" radius="md">Start Test</Button>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    )
        ;
}