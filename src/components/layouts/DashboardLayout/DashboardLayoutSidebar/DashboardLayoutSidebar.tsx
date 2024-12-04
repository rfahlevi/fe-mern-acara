import { cn } from "@/utils/cn"
import { Button, Listbox, ListboxItem } from "@nextui-org/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { BiLogOut } from "react-icons/bi"

interface SidebarItemProps {
    key: string,
    label: string,
    href: string,
    icon: JSX.Element
}

interface PropTypes {
    sidebarItems: SidebarItemProps[],
    isOpen: boolean
}


const DashboardLayoutSidebar = (props: PropTypes) => {
    const { sidebarItems, isOpen } = props
    const router = useRouter()

    return (
        <div className={cn(
            "fixed lg:relative -translate-x-full lg:translate-x-0 z-50 flex flex-col justify-between h-screen w-full max-w-[250px] border-r-1 border-default-200 bg-white px-4 py-6 transition-all duration-250 ease-out",
            { "translate-x-0": isOpen }
        )}>
            <div>
                <div className="flex w-full justify-center">
                    <Image
                        src="/images/general/logo.svg"
                        alt="Logo"
                        priority
                        width={120}
                        height={40}
                        objectFit="cover"
                        className="mb-6"
                        onClick={() => router.push("/")}
                    />
                </div>
                <Listbox
                    items={sidebarItems}
                    variant="solid"
                    aria-label="Dashboard Menu"
                >
                    {(item) => (
                        <ListboxItem
                            key={item.key}
                            className={cn("my-1 h-12 text-2xl", {
                                "bg-danger-500 text-white": item.href === router.pathname,
                            })}
                            startContent={item.icon}
                            textValue={item.label}
                            aria-labelledby={item.label}
                            aria-describedby={item.label}
                        >
                            <p className="text-sm font-medium">{item.label}</p>
                        </ListboxItem>
                    )}
                </Listbox>
            </div>
            <div className="flex items-center p-1">
                <Button
                    color="danger"
                    fullWidth
                    variant="light"
                    className="flex justify-start rounded-lg font-medium
                     px-2 py-1.5"
                    onClick={() => signOut()}
                >
                    <BiLogOut />
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default DashboardLayoutSidebar