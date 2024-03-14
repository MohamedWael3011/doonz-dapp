import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./NavigationMenu";

interface NavListProps {
  listItems: { name: string; link: string }[];
  title:string
}
export default function NavList({ listItems, title }: NavListProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col justify-center items-center gap-3 px-5 py-2 w-full">
              {listItems.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <li className="hover:border-b border-primary">
                  <NavigationMenuLink asChild>
                    <a href={item.link}>{item.name}</a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
