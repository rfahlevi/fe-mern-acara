import {
  CiBookmark,
  CiShoppingTag,
  CiUser,
  CiViewList,
  CiWallet,
} from "react-icons/ci";

const SIDEBAR_MEMBER = [
  {
    key: "transaction",
    label: "Transaction",
    href: "/member/transactions",
    icon: <CiWallet />,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/member/profile",
    icon: <CiUser />,
  },
];

const SIDEBAR_ADMIN = [
  {
    key: "event",
    label: "Event",
    href: "/admin/events",
    icon: <CiViewList />,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/categories",
    icon: <CiShoppingTag />,
  },
  {
    key: "banner",
    label: "Banner",
    href: "/admin/banners",
    icon: <CiBookmark />,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/admin/transactions",
    icon: <CiWallet />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
