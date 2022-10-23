import {Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack} from '@mantine/core';
import {
    TablerIcon,
    IconHome2,
    IconLogout, IconBuildingLighthouse, IconAB2,
} from '@tabler/icons';
import {useRouter} from "next/router";

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },
    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
        },
    },
}));

interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;

    onClick?(): void;
}

/**
 * Every clickable link.
 */
const linkData = [
    {icon: IconHome2, label: 'Home', url: "/dashboard"},
    {icon: IconAB2, label: 'Tests', url: "/dashboard/tests"},
];

/**
 * This is a clickable component, which will act as a link in the sidebar.
 */
function NavbarLink({icon: Icon, label, active, onClick}: NavbarLinkProps) {
    const {classes, cx} = useStyles();

    return (
        <Tooltip label={label} position="right" transitionDuration={0}>
            <UnstyledButton onClick={onClick} className={cx(classes.link, {[classes.active]: active})}>
                <Icon stroke={1.5}/>
            </UnstyledButton>
        </Tooltip>
    );
}

export default function NavbarMinimal() {
    const router = useRouter();

    const links = linkData.map(link => (
        <NavbarLink
            {...link}
            key={link.label}
            active={router.pathname === link.url}
            onClick={() => router.push(link.url).then(_ => ({}))}
        />
    ));

    return (
        <Navbar height={"100vh"} width={{base: 80}} p="md">
            <Center>
                <IconBuildingLighthouse/>
            </Center>

            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>

            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <NavbarLink onClick={() => {
                        router.push("/account/login").then(_ => ({}))
                    }} icon={IconLogout} label="Logout"/>
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}