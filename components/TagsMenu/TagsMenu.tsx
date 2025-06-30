"use client";

import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";

const TAGS = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button
        onClick={toggleMenu}
        className={css.menuButton}
        aria-expanded={isOpen}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={tag === "All" ? "/notes/filter" : `/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
