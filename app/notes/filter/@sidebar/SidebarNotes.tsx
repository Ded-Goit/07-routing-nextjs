import css from "./SidebarNotes.module.css";
import Link from "next/link";

const TAGS = ["All", "Work", "Personal", "Meeting", "Shopping", "Todo"];

export default function SidebarNotes() {
  return (
    <aside>
      <ul className={css.menuList}>
        {TAGS.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={tag === "All" ? "/notes/filter" : `/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
