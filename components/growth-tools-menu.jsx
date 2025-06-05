"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Book1, Briefcase, DocumentText, Edit, Flashy } from "iconsax-reactjs";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

export default function GrowthToolsMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Trigger */}
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-semibold text-white shadow focus:outline-none">
        <Flashy size="16" color="#d9e3f0" variant="Bulk" />
        <span className="hidden md:block">Growth Tools</span>
        <ChevronDownIcon className="ml-2 h-4 w-4" />
      </MenuButton>

      {/* Menu Items */}
      <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-zinc-800 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1">
          <MenuItem>
            {({ active }) => (
              <Link
                href="/resume"
                className={`group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-zinc-700 text-white" : "text-gray-300"
                }`}
              >
                <DocumentText size="16" color="#d9e3f0" variant="Bulk" />
                Build Resume
              </Link>
            )}
          </MenuItem>

          <MenuItem>
            {({ active }) => (
              <Link
                href="/cover-letter"
                className={`group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-zinc-700 text-white" : "text-gray-300"
                }`}
              >
                <Edit size="16" color="#d9e3f0" variant="Bulk" />
                Cover Letter
              </Link>
            )}
          </MenuItem>

          <MenuItem>
            {({ active }) => (
              <Link
                href="/interview"
                className={`group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-zinc-700 text-white" : "text-gray-300"
                }`}
              >
                <Book1 size="16" color="#d9e3f0" variant="Bulk" />
                Interview Prep
              </Link>
            )}
          </MenuItem>

          <MenuItem>
            {({ active }) => (
              <Link
                href="/recommended-jobs"
                className={`group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-zinc-700 text-white" : "text-gray-300"
                }`}
              >
                <Briefcase size="16" color="#d9e3f0" variant="Bulk" />
                Recommended Jobs
              </Link>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
