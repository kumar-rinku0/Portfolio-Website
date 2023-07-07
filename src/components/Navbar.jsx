import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary" : "bg-transparent"
        }`}
    >
      <div
        className="w-full flex justify-between items-center max-w-7xl mx-auto"
      >
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Rinku Kumar &nbsp;
            <span
              className="md:block hidden"
            >
              |  Software Developer
            </span>
          </p>
        </Link>
        <ul className="list-none hidden md:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? "text-white" : " text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <motion.div
                className="box"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 600, damping: 10 }}
              >
                <a href={`#${nav.id}`}>
                  {nav.title}
                </a>
              </motion.div>
            </li>
          ))}

        </ul>
        <div className="md:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${!toggle ? 'hidden' : 'flex'}
                      p-6 black-gradient absolute top-20 right-0 mx-4 min-2-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`${active === nav.title ? "text-white" : " text-secondary"}
                              font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <motion.div
                    className="box hover:text-white"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 600, damping: 10 }}
                  >
                    <a href={`#${nav.id}`}>
                      {nav.title}
                    </a>
                  </motion.div>

                </li>
              ))}

            </ul>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default Navbar;