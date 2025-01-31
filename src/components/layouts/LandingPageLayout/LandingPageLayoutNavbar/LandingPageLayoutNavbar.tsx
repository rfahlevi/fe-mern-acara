import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
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
import { IEvent } from "@/types/Event";

export default function LandingPageLayoutNavbar() {
  const session = useSession();
  const router = useRouter();
  const {
    dataEventsSearch,
    dataProfile,
    isRefecthingEventSearch,
    isLoadingEventsSearch,
    handleSearch,
    search,
    setSearch,
  } = useLandingPageLayoutNavbar();

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
            onClear={() => setSearch("")}
            onChange={handleSearch}
          />
          {search !== "" && (
            <Listbox
              items={dataEventsSearch || []}
              emptyContent="Event not found"
              className="absolute right-0 top-12 rounded-xl border border-default-200 bg-white"
            >
              {!isRefecthingEventSearch && !isLoadingEventsSearch ? (
                (item: IEvent) => (
                  <ListboxItem
                    key={`${item._id}`}
                    href={`/events/${item.slug}`}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={`${item?.banner}`}
                        alt="banner"
                        className="w-2/5 rounded-md"
                        width={100}
                        height={40}
                      />
                      <p className="line-clamp-2 w-3/5 text-wrap">
                        {item?.name}
                      </p>
                    </div>
                  </ListboxItem>
                )
              ) : (
                <ListboxItem key="loading">
                  <Spinner color="danger" size="sm" />
                </ListboxItem>
              )}
            </Listbox>
          )}
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
