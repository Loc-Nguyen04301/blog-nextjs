import { Metadata } from "next";
import MenuPageClientSide from "./MenuPageClientSide";

export const metadata: Metadata = {
  title: "Mục lục - Loc Nguyen Writer",
  description: "Mục lục - Loc Nguyen Writer",
  icons: {
    icon: "favicon.ico",
  },
};

const MenuPage = () => {
  return <MenuPageClientSide />;
};

export default MenuPage;
