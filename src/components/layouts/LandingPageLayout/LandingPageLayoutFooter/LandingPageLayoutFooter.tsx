import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constant";

export default function LandingPageLayoutFooter() {
  return (
    <div className="flex flex-col items-center justify-between bg-slate-900 px-6 py-6 lg:flex-row lg:text-left xl:p-8">
      <Image
        src="/images/general/logo.svg"
        alt="logo"
        width={100}
        height={50}
        priority
        className="mb-4 w-32 lg:mb-0 lg:w-40"
      />
      <div className="mb-4 flex flex-col gap-4 text-sm lg:mb-0">
        <div>
          <h4 className="text-white">Customer Service</h4>
          <p className="text-gray-400">
            <Link href="mailto:hello@acara.id">hello@acara.id</Link> |{" "}
            <Link href="tel:+6287712345678">+62 0877 1234 5678</Link>
          </p>
        </div>
        <div>
          <h4 className="text-white">Office</h4>
          <p className="text-gray-400">Jl. WPU Course No. 1</p>
        </div>
      </div>

      <div className="mb-10 flex flex-col items-start gap-2 lg:mb-0 lg:items-center">
        <h2 className="text-white lg:mb-1">Menu</h2>
        {NAV_ITEMS.map((item) => (
          <Link
            key={`footer-${item.label}`}
            href={item.href}
            className="cursor-pointer text-sm text-gray-400 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-between gap-8 text-gray-400">
          {SOCIAL_ITEMS.map((item) => (
            <Link
              href={item.href}
              className="text-3xl hover:text-white"
              key={`footer-${item.label}`}
            >
              {item.icon}
            </Link>
          ))}
        </div>
        <p className="w-full text-center text-xs text-gray-400">
          CopyRight © 2025 Acara. All rights reserved.
        </p>
      </div>
    </div>
  );
}
