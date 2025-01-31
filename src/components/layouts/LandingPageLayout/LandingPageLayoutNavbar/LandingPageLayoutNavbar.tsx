import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constant";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import CustomInput from "@/components/ui/CustomInput";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";

export default function LandingPageLayoutNavbar() {
  const session = useSession();
  const router = useRouter();
  const { dataProfile } = useLandingPageLayoutNavbar();

  return (
    <Navbar maxWidth="full" isBordered isBlurred={false} shouldBlockScroll>
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/general/logo.svg"
            alt="Logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.label}`}
              className={cn(
                "text-sm font-medium text-default-700 hover:text-danger",
                {
                  "font-bold text-danger-500": router.pathname === item.href,
                },
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      <NavbarContent justify="end">
        <NavbarMenuToggle className="lg:hidden" />
        <NavbarItem className="hidden lg:relative lg:flex">
          <CustomInput
            isClearable
            className="he w-[300px]"
            placeholder="Search event..."
            startContent={<CiSearch />}
            onClear={() => {}}
            onChange={() => {}}
          />
        </NavbarItem>
        {session.status === "authenticated" ? (
          <NavbarItem className="hidden lg:block">
            <Dropdown>
              <DropdownTrigger>
                <div className="flex cursor-pointer items-center gap-2">
                  <Avatar src={dataProfile?.profilePicture} showFallback />
                  <div className="flex flex-col justify-start">
                    <p className="text-sm font-semibold text-default-700">
                      {dataProfile?.fullName}
                    </p>
                    <p className="text-xs text-default-500">
                      {dataProfile?.username}
                    </p>
                  </div>
                </div>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="dropdown-dashboard"
                  href="/admin/dashboard"
                  className={cn({ hidden: dataProfile?.role !== "admin" })}
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem key="dropdown-profile" href="/member/profile">
                  Profile
                </DropdownItem>
                <DropdownItem key="dropdown-signout" onPress={() => signOut()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <div className="hidden items-center gap-2 lg:flex">
            {BUTTON_ITEMS.map((item) => (
              <NavbarItem key={`nav-${item.label}`}>
                <Button
                  as={Link}
                  color="danger"
                  size="sm"
                  variant={item.variant as ButtonProps["variant"]}
                  href={item.href}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            ))}
          </div>
        )}

        <NavbarMenu className="gap-0">
          {NAV_ITEMS.map((item) => (
            <NavbarMenuItem
              key={`nav-menu-${item.label}`}
              className={cn(
                "cursor-pointer rounded-lg p-2 text-sm font-medium text-default-700 hover:bg-danger/5 hover:text-danger",
                {
                  "font-bold text-danger-500": router.pathname === item.href,
                },
              )}
            >
              <Link href={item.href} className="flex w-full">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            <Fragment>
              <NavbarMenuItem
                key="nav-menu-dashboard"
                className={cn(
                  "cursor-pointer rounded-lg p-2 text-sm font-medium text-default-700 hover:bg-danger/5 hover:text-danger",
                  {
                    hidden: dataProfile?.role !== "admin",
                  },
                )}
              >
                <Link href="/admin/dashboard" className="flex w-full">
                  Dashboard
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem
                key="nav-menu-profile"
                className={cn(
                  "cursor-pointer rounded-lg p-2 text-sm font-medium text-default-700 hover:bg-danger/5 hover:text-danger",
                )}
              >
                <Link href="/member/profile" className="flex w-full">
                  Profile
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem key="nav-menu-logout" className={cn("py-4")}>
                <Button
                  className="w-full"
                  variant="bordered"
                  size="sm"
                  color="danger"
                  onPress={() => signOut()}
                >
                  Logout
                </Button>
              </NavbarMenuItem>
            </Fragment>
          ) : (
            BUTTON_ITEMS.map((item) => (
              <NavbarMenuItem key={`nav-menu-${item.label}`} className="mt-2">
                <Button
                  as={Link}
                  color="danger"
                  className="w-full"
                  size="sm"
                  variant={item.variant as ButtonProps["variant"]}
                  href={item.href}
                >
                  {item.label}
                </Button>
              </NavbarMenuItem>
            ))
          )}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}
