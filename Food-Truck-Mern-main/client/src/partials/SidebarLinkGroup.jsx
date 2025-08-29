import React, { useState } from 'react';

function SidebarLinkGroup({
  children,
  activeCondition,
}) {

  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <li className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${activeCondition && 'from-fuchsia-500/[0.12] dark:from-fuchsia-400/[0.24] to-fuchsia-600/[0.04]'}`}>
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;