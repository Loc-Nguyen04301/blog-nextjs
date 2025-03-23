import AboutMe from "@/components/groupBlogLayout/AboutMe";
import ContactMe from "@/components/groupBlogLayout/ContactMe";
import LastestBlogList from "@/components/groupBlogLayout/LastestBlogList";
import CategorySelect from "@/components/groupBlogLayout/CategorySelect";
import SearchBar from "@/components/groupBlogLayout/SearchBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-11">
      <div className="col-span-7 max-md:col-span-12">{children}</div>
      <div className="col-span-4 max-md:col-span-12 ml-16 max-md:ml-0 max-md:mt-20">
        <div className="flex flex-col gap-16">
          <AboutMe />
          <SearchBar />
          <CategorySelect />
          <LastestBlogList />
          <ContactMe />
        </div>
      </div>
    </div>
  );
};

export default Layout;
