import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineDarkMode } from 'react-icons/md';

const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
          Voting
        </span>
        App
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..?"
          rightIcon={CiSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-12 lg:hidden" color="gray" pill>
        <CiSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <MdOutlineDarkMode />
        </Button>
        <Link to="/sign-up">
          <Button gradientDuoTone="purpleToBlue">Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          className={
            path === '/'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-700 dark:text-gray-300'
          }
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/dashboard"
          className={
            path === '/dashboard'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-700 dark:text-gray-300'
          }
        >
          Dashboard
        </Navbar.Link>
        <Navbar.Link
          href="/result"
          className={
            path === '/result'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-700 dark:text-gray-300'
          }
        >
          Result
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
