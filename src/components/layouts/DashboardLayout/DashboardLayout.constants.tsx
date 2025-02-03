import {
  CiBookmark,
  CiGrid41,
  CiSettings,
  CiShoppingTag,
  CiViewList,
  CiWallet,
} from "react-icons/ci";

const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: <CiGrid41 />,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/member/transactions",
    icon: <CiWallet />,
  },
  {
    key: "setting",
    label: "Setting",
    href: "/member/setting",
    icon: <CiSettings />,
  },
];

const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <CiGrid41 />,
  },
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
