"use client";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import React from "react";
import { usePathname } from "next/navigation";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const paths: any = {
  "/traccar": 0,
  "/paraderos": 2,
};
const HomeLayout = ({ children }: HomeLayoutProps) => {
  const path = usePathname();
  return (
    <div className="p-10 max-w-7xl m-auto">
      <Tabs defaultIndex={paths[path] as number}>
        <TabList>
          <Link
            as={NextLink}
            href="/traccar"
            style={{ textDecoration: "none" }}
          >
            <Tab value="1">Traccar</Tab>
          </Link>
          <Link as={NextLink} href="/paraderos" style={{ textDecoration: "none" }}>
            <Tab value="2">Paraderos</Tab>
          </Link>
        </TabList>
        <TabPanels>
          <TabPanel>{children}</TabPanel>
          <TabPanel>{children}</TabPanel>
          <TabPanel>{children}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default HomeLayout;
