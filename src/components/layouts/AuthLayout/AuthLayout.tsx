import PageHead from "@/components/commons/PageHead"
import React, { Fragment } from "react"

interface PropTypes {
    children: React.ReactNode
    title?: string
}

const AuthLayout = (props: PropTypes) => {
    const { children, title } = props
    return (
        <div className="flex min-h-screen min-w-full items-center justify-center gap-10">
            <PageHead title={title} />
            <section className="max-w-screen-3xl 3xl:container p-6">
                {children}
            </section>
        </div>
    )
}

export default AuthLayout