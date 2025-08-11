import { useEffect, useState } from "react";
import "./PaginationCustom.css";

interface InterfaceProps {
  totalItems: number;
  itemsPerPage?: number;
  currentPage?: number;
  className?: string;
  classes?: {
    list?: string;
    li?: string;
    prev?: string;
    first?: string;
    item?: string;
    last?: string;
    next?: string;
    elipsisInf?: string;
    elipsisSup?: string;
  };
  setPage: (page: number) => void;
  iconNext?: string;
  iconPrev?: string;
  iconLast?: string;
  iconFirst?: string;

  showJumps?: boolean;
  siblings?: number;
  showElipsis?: boolean;
  iconElipsisInf?: string;
  iconElipsisHoverInf?: string | any;
  iconElipsisSup?: string;
  iconElipsisHoverSup?: string | any;

  breakpoints?: {
    [key: number]: {
      showElipsis?: boolean;
      siblings?: number;
      showJumps?: boolean;
    };
  };
}

const icon_arrow_curv_left = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 256"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M230,184a6,6,0,0,1-12,0A90,90,0,0,0,64.36,120.36L38.55,146H88a6,6,0,0,1,0,12H24a6,6,0,0,1-6-6V88a6,6,0,0,1,12,0v49.58l25.89-25.72A102,102,0,0,1,230,184Z"></path>
  </svg>
);

const icon_arrow_curv_right = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 256 256"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M238,88v64a6,6,0,0,1-6,6H168a6,6,0,0,1,0-12h49.45l-25.8-25.63A90,90,0,0,0,38,184a6,6,0,0,1-12,0,102,102,0,0,1,174.12-72.12L226,137.58V88a6,6,0,0,1,12,0Z"></path>
  </svg>
);

export default function PaginationCustom({
  totalItems = 0,
  itemsPerPage = 10,
  currentPage = 1,
  className = "",
  classes = {},
  setPage = () => {},
  iconNext = ">",
  iconPrev = "<",
  iconLast = ">>",
  iconFirst = "<<",
  showJumps = false,
  siblings = 1,

  showElipsis = false,
  iconElipsisInf = "...",
  iconElipsisHoverInf = icon_arrow_curv_left,
  iconElipsisSup = "...",
  iconElipsisHoverSup = icon_arrow_curv_right,

  breakpoints,
}: InterfaceProps) {
  const default_configs = {
    showElipsis: showElipsis,
    siblings: siblings,
    showJumps: showJumps,
  };
  const [configs, setConfigs] = useState(default_configs);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const lim_inf =
    currentPage - configs.siblings < 1
      ? 1
      : currentPage + configs.siblings > totalPages
      ? totalPages - configs.siblings * 2
      : currentPage - configs.siblings;
  const lim_sup =
    currentPage + configs.siblings > totalPages
      ? totalPages
      : currentPage - configs.siblings < 1
      ? 1 + configs.siblings * 2
      : currentPage + configs.siblings;

  // style
  const class_li =
    "select-none flex flex-wrap items-center justify-center shadow-md min-w-9 w-9 h-9 text-small rounded-md" +
    (classes.li ? " " + classes.li : "");
  const classes_ = {
    wrapper: "pagination-custom p-2" + (className ? " " + className : ""),
    list:
      "flex flex-wrap gap-1 justify-center" +
      (classes.list ? " " + classes.list : ""),
    prev: class_li + (classes.prev ? " " + classes.prev : ""),
    first:
      class_li +
      " data-[hidden=true]:hidden" +
      (classes.first ? " " + classes.first : ""),
    item:
      class_li +
      " max-[230px]:data-[active=false]:hidden data-[active=false]:data-[hidden=true]:hidden" +
      (classes.item ? " " + classes.item : ""),
    last:
      class_li +
      " data-[hidden=true]:hidden " +
      (classes.last ? " " + classes.last : ""),
    next: class_li + (classes.next ? " " + classes.next : ""),
    elipsisInf:
      class_li +
      " data-[hidden=true]:hidden group" +
      (classes.elipsisInf ? " " + classes.elipsisInf : ""),
    elipsisSup:
      class_li +
      " data-[hidden=true]:hidden group" +
      (classes.elipsisSup ? " " + classes.elipsisSup : ""),
  };
  const actions = {
    prev: () => setPage(currentPage - 1),
    first: () => setPage(1),
    last: () => setPage(totalPages),
    next: () => setPage(currentPage + 1),
    elipsisInf: () => {
      let to = currentPage - configs.siblings * 2;
      if (to < 1) to = 1;
      if (configs.siblings === 0) to = currentPage - 1;
      setPage(to);
    },
    elipsisSup: () => {
      var to = currentPage + configs.siblings * 2;
      if (to > totalPages) to = totalPages;
      if (configs.siblings === 0) to = currentPage + 1;
      setPage(to);
    },
  };

  useEffect(() => {
    if (breakpoints) {
      const updateConfigs = () => {
        const screen = window.innerWidth;
        const configs_ = structuredClone(default_configs);

        Object.entries(breakpoints).forEach(([breakpoint, value]) => {
          if (Number(breakpoint) <= screen) {
            Object.assign(configs_, value);
          }
        });

        setConfigs(configs_);
      };

      updateConfigs();
      window.addEventListener("resize", updateConfigs);

      return () => {
        window.removeEventListener("resize", updateConfigs);
      };
    }
  }, []);

  return (
    <nav
      data-slot="wrapper"
      role="navigation"
      aria-label="pagination navigation"
      className={classes_.wrapper}
    >
      <ul data-slot="list" className={classes_.list}>
        <li
          data-slot="prev"
          role="button"
          aria-label="previous page button"
          title="Página anterior"
          className={classes_.prev}
          data-disabled={currentPage <= 1}
          onClick={actions.prev}
        >
          {iconPrev}
        </li>

        <li
          data-slot="first"
          role="button"
          aria-label="first page button"
          title="Primera página"
          data-hidden={configs.showJumps ? lim_inf <= 1 : true}
          className={classes_.first}
          onClick={actions.first}
        >
          {iconFirst}
        </li>

        <li
          data-slot="elipsisInf"
          role="button"
          aria-label="elipsis inferior button"
          title={"Saltar " + configs.siblings * 2 + " páginas atrás"}
          data-hidden={configs.showElipsis ? lim_inf <= 1 : true}
          className={classes_.elipsisInf}
          onClick={actions.elipsisInf}
        >
          <span className="group-hover:hidden">{iconElipsisInf}</span>
          <span className="hidden group-hover:block">
            {iconElipsisHoverInf}
          </span>
        </li>

        {[...Array(totalPages)].map((_, i) => {
          const num = i + 1;
          return (
            <li
              key={num}
              data-slot="item"
              role="button"
              aria-label={"pagination item " + num}
              title={"Página " + num}
              data-active={currentPage === num}
              data-hidden={num < lim_inf || num > lim_sup}
              className={classes_.item}
              onClick={() => setPage(num)}
            >
              {num}
            </li>
          );
        })}

        <li
          data-slot="elipsisSup"
          role="button"
          aria-label="elipsis superior button"
          title={"Saltar " + configs.siblings * 2 + " páginas adelante"}
          data-hidden={configs.showElipsis ? lim_sup === totalPages : true}
          className={classes_.elipsisSup}
          onClick={actions.elipsisSup}
        >
          <span className="group-hover:hidden">{iconElipsisSup}</span>
          <span className="hidden group-hover:block">
            {iconElipsisHoverSup}
          </span>
        </li>

        <li
          data-slot="last"
          role="button"
          aria-label="last page button"
          title="Última página"
          data-hidden={configs.showJumps ? lim_sup >= totalPages : true}
          className={classes_.last}
          onClick={actions.last}
        >
          {iconLast}
        </li>

        <li
          data-slot="next"
          role="button"
          aria-label="next page button"
          title="Página siguiente"
          data-disabled={currentPage >= totalPages}
          className={classes_.next}
          onClick={actions.next}
        >
          {iconNext}
        </li>
      </ul>
    </nav>
  );
}
