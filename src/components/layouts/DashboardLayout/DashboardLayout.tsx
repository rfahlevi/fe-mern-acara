import PageHead from "@/components/commons/PageHead"
import React, { Fragment, useState } from "react"
import DashboardLayoutSidebar from "./DashboardLayoutSidebar"
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constants"
import { Navbar, NavbarMenuToggle } from "@nextui-org/react"

interface PropTypes {
    children: React.ReactNode,
    title?: string,
    description?: string,
    type?: string,
}

const DashboardLayout = (props: PropTypes) => {
    const [open, setOpen] = useState(false)

    const { children, title, description, type = "admin" } = props

    return (
        <Fragment>
            <PageHead title={title} />
            <section className="max-w-3xl 3xl:container flex">
                <DashboardLayoutSidebar
                    sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
                    isOpen={open}
                />
                <div className="h-screen w-full overflow-y-auto px-4">
                    <Navbar
                        shouldHideOnScroll
                        className="flex items-center justify-between bg-transparent px-0"
                        classNames={{
                            wrapper: "p-0",
                        }}
                        isBlurred={false}
                        position="static"
                    >
                        <h1 className="text-2xl font-bold">
                            {title}
                        </h1>
                        <NavbarMenuToggle
                            aria-label={open ? "Close menu" : "Open menu"}
                            onClick={() => setOpen(!open)}
                            className="lg:hidden"
                        />
                    </Navbar>
                    <p className="mb-4 text-sm">{description}</p>
                    {children}
                </div>
            </section>
        </Fragment>
    )
}

export default DashboardLayout