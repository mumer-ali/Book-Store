import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Badge from "@mui/material/Badge";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "@/store/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useCart from "@/store/useCart";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { cart } = useCart();
  const logout = () => {
    setUser(null);
    toast.success("Successfully logged out");
    navigate("/");
  };
  return (
    <>
      <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white select-none">
        <NavigationMenu className="mx-auto ">
          <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
            <NavigationMenuItem className="font-bold flex">
              <div className="mb-6 md:mb-0">
                <Link to="/" className="flex items-center">
                  <BookIcon />
                  <span className="self-center text-2xl font-semibold">
                    Bookshelf
                  </span>
                </Link>
              </div>
            </NavigationMenuItem>
            <NavigationMenu className="hidden lg:flex items-center">
              <NavigationMenuList>
                <NavigationMenuItem className="pr-3">
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-32">
                      <li className="row-span-3 cursor-pointer">
                        <NavigationMenuLink asChild>
                          <div
                            onClick={() =>
                              navigate(`/books/category/${"fiction"}`)
                            }
                            className="flex w-full select-none rounded-md no-underline outline-none p-1 text-sm"
                          >
                            Fiction
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <div
                            onClick={() =>
                              navigate(`/books/category/${"non-fiction"}`)
                            }
                            className="flex w-full select-none rounded-md no-underline outline-none p-1 text-sm"
                          >
                            Non-Fiction
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <div
                            onClick={() =>
                              navigate(`/books/category/${"history"}`)
                            }
                            className="flex w-full select-none rounded-md no-underline outline-none p-1 text-sm"
                          >
                            History
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <div
                            onClick={() =>
                              navigate(`/books/category/${"biography"}`)
                            }
                            className="flex w-full select-none rounded-md no-underline outline-none p-1 text-sm"
                          >
                            Biography
                          </div>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem className="pr-3 cursor-pointer">
                  <div
                    onClick={() => navigate("/books")}
                    className="flex w-full select-none rounded-md no-underline outline-none p-1 text-sm"
                  >
                    Books
                  </div>
                </NavigationMenuItem>
                <NavigationMenuItem className="pr-3 cursor-pointer">
                  <div
                    onClick={() => navigate("/books/discount")}
                    className="flex w-full select-none rounded-md no-underline outline-none p-1 text-sm"
                  >
                    Discounts
                  </div>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden lg:flex gap-2">
              {user ? (
                <div className="flex justify-between items-center cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <Button variant="ghost">
                        <div className="flex items-center">
                          <p className="pr-2">{`${user.firstName} ${user.lastName}`}</p>
                          <div className="h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                            <Avatar className="w-10 h-10 border">
                              <AvatarFallback>
                                {getInitials(
                                  `${user.firstName} ${user.lastName}`
                                )}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 rounded-sm p-4 text-sm">
                      <p className="cursor-pointer" onClick={logout}>
                        <b>Log Out</b>
                      </p>
                    </PopoverContent>
                  </Popover>
                  <div className="flex items-center">
                    <Badge badgeContent={cart.length} color="primary">
                      <Link to="/cart" className="ml-4">
                        <FaShoppingCart className="ml-4 mt-2" size={20} />
                      </Link>
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <div>
                    <Button
                      className="h-9 w-20 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </Button>
                  </div>
                  <div>
                    <Button
                      className="h-9 w-20 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 bg-white text-black"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </Button>
                  </div>
                  <Badge badgeContent={cart.length} color="primary">
                    <Link to="/cart" className="ml-4">
                      <FaShoppingCart className="ml-4 mt-2" size={20} />
                    </Link>
                  </Badge>
                </div>
              )}
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </>
  );
};

export default Navbar;

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

const getInitials = (fullname) => {
  const words = fullname.split(" ");

  const initials = words.reduce((result, word) => {
    if (word.length > 0) {
      result += word[0].toUpperCase();
    }
    return result;
  }, "");

  return initials;
};
