import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";

interface PropTypes {
  children: ReactNode;
  title: string;
}

export default function LandingPageLayaout(props: PropTypes) {
  const { children, title } = props;

  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar />
      <div className="max-w-screen-2xl py-10 2xl:container md:p-6">
        {children}
      </div>
    </Fragment>
  );
}
