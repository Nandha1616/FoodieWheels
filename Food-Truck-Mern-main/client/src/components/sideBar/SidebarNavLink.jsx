import React from "react";
import { NavLink } from "react-router-dom";
import SidebarLinkGroup from "../../partials/SidebarLinkGroup";

export default function SidebarNavLink({
  pathname,
  path,
  label,
  active,
  Icon
}) {
  return (
    <>
      <ul className="">
        <SidebarLinkGroup activeCondition={pathname === path || active}>
          {(handleClick, open) => {
            return (
              <React.Fragment>
                <NavLink
                  to={path}
                  className={`block text-gray-800 dark:text-slate-800 truncate transition duration-150 ${
                    pathname === path || active
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>
                        {path === "/admin" ? (
                          <svg
                            className={`shrink-0 fill-current ${
                              pathname === "/admin" ||
                              pathname.includes("admin")
                                ? "text-violet-600"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                            // xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                            <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                          </svg>
                        ) : (
                          <div
                            className={`shrink-0 fill-current  ${
                              pathname === path || active
                                ? "text-violet-500"
                                : "text-gray-00 dark:text-gray-500"
                            }`}
                          >
                            {Icon}
                          </div>
                        )}
                      </span>
                      <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        {label}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </React.Fragment>
            );
          }}
        </SidebarLinkGroup>
      </ul>
    </>
  );
}
