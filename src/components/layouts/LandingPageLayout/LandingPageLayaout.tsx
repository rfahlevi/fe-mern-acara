import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";
import { useSession } from "next-auth/react";

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
      <div className="py-10 md:p-6">{children}</div>
      <LandingPageLayoutFooter />
    </Fragment>
  );
}
