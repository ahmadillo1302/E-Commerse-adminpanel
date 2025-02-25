"use client";

import * as React from "react";
import {
  CreditCard,
  Layers,
  Package,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar(props) {
  const [firstname, setFirstname] = React.useState("");
  const [emailUser, setEmailUser] = React.useState("");

  React.useEffect(() => {
    const dataString = localStorage.getItem("data");
    console.log(dataString);

    if (dataString) {
      const data = JSON.parse(dataString);
      setFirstname(data.firstname || "");
      setEmailUser(data.email || "");
    }
  }, []);

  const appData = {
    user: {
      name: firstname,
      email: emailUser,
    },
    teams: [
      {
        name: "Sotuv Uz",
        plan: "E-commerce",
      },
    ],
    navMain: [
      {
        title: "Products",
        url: "/products",
        icon: Package,
        isActive: true,
        items: [{ title: "View All Products", url: "/dashboard/products" }],
      },
      {
        title: "Categories",
        url: "#",
        icon: Layers,
        items: [{ title: "View All categories", url: "/dashboard/categories" }],
      },
      {
        title: "Users",
        url: "#",
        icon: Users,
        items: [{ title: "View Users", url: "/dashboard/users" }],
      },
      {
        title: "Reviews",
        url: "#",
        icon: Star,
        items: [{ title: "View Reviews", url: "/dashboard/reviews" }],
      },
      {
        title: "Orders",
        url: "#",
        icon: ShoppingCart,
        items: [{ title: "View Orders", url: "/dashboard/orders" }],
      },
      {
        title: "Payments",
        url: "#",
        icon: CreditCard,
        items: [{ title: "View Payments", url: "/dashboard/payments" }],
      },
    ],
  };

  return (
    <Sidebar collapsible {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={appData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={appData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={appData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
