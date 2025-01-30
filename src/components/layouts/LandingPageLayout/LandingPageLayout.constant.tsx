import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const BUTTON_ITEMS = [
  {
    label: "Register",
    href: "/auth/register",
    variant: "bordered",
  },
  {
    label: "Login",
    href: "/auth/login",
    variant: "solid",
  },
];

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Explore",
    href: "/events",
  },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://facebook.com/acara",
    icon: <FaFacebook />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/@acara",
    icon: <FaInstagram />,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@acara",
    icon: <FaTiktok />,
  },
  {
    label: "X",
    href: "https://x.com/@acara",
    icon: <FaTwitter />,
  },
  {
    label: "Youtube",
    href: "https://youtube.com/@acara",
    icon: <FaYoutube />,
  },
];

export { BUTTON_ITEMS, NAV_ITEMS, SOCIAL_ITEMS };
