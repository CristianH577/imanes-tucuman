import React from "react";

import type { TypeObjectGeneral } from "../consts/types";

import { CircularProgress } from "@mui/material";

interface InterfaceTableCustomProps {
  id?: string;
  className?: string;
  classNames?: TypeObjectGeneral;
  columns: any[];
  rows: any[];
  rowColumnId?: string;
  ariaLabel?: string;
  isLoading?: boolean;
  emptyMessage?: string | React.ReactElement;
  tdLabel?: boolean;
  onSelectedRows?: (id: string) => void;
  makeHeaderCell?: (
    col: string | TypeObjectGeneral
  ) => string | React.ReactElement;
  makeRow?: (row: TypeObjectGeneral) => React.ReactElement;
  makeCell?: (row: TypeObjectGeneral, col: string) => React.ReactElement;
  makeCellContent?: (
    row: TypeObjectGeneral,
    col: string
  ) => string | React.ReactElement;
  selectionMode?: string;
  selectedRows?: string[];
  captionContent?: React.ReactElement;
  tfootContent?: React.ReactElement;
}

function TableCustom({
  id = undefined,
  className,
  classNames,
  columns,
  rows,
  rowColumnId,
  ariaLabel,
  isLoading,
  emptyMessage,
  tdLabel,
  makeCellContent,
  makeHeaderCell,
  makeRow,
  makeCell,
  onSelectedRows,
  selectionMode,
  selectedRows,
  tfootContent,
  captionContent,
}: InterfaceTableCustomProps) {
  const classNames_ = {
    table: "",
    caption: "",
    thead: "",
    theadRow: "",
    th: "",
    tbody: "",
    row: "",
    td: "",
    tfoot: "",
    ...classNames,
  };
  const columns_ = columns?.length ? columns : [];

  const handleSelectedRow = (id: string) => {
    onSelectedRows && onSelectedRows(id);
  };

  const rows_ = () => {
    return rows?.map((row, i) => {
      let id_row =
        rowColumnId && row.hasOwnProperty(rowColumnId)
          ? row[rowColumnId]
          : row?.key || row?.id || i;

      const className =
        (selectionMode ? "cursor-pointer" : "") +
        (selectionMode && selectionMode === "single"
          ? " hover:bg-default-100 data-[selected=true]:bg-default-200"
          : "") +
        (classNames_.row ? " " + classNames_.row : "");

      const dataRow = {
        "data-selected": selectedRows && selectedRows?.includes(id_row),
        "data-id": id_row,
      };

      var tr = <tr onClick={() => handleSelectedRow(id_row)}></tr>;
      if (makeRow) tr = makeRow(row);

      const existingData = tr?.props || {};
      const mergedData = { ...existingData, ...dataRow };
      const existingClassName = tr?.props?.className || "";
      const mergedClassName = `${existingClassName} ${className}`.trim();

      tr = React.cloneElement(tr, {
        key: id_row,
        ...mergedData,
        className: mergedClassName || null,
      });

      const cells = columns_.map((col) => {
        const idCol = col?.key || col?.id || col;

        var td = <td></td>;
        const tdObj = {
          key: id_row + "_" + idCol,
          ...mergedData,
          className: "py-2 px-3" + (classNames_.td ? " " + classNames_.td : ""),
        };
        if (makeCell) td = makeCell(row, idCol);
        if (tdLabel) tdObj["data-label"] = col?.label || "";

        td = React.cloneElement(td, tdObj);

        return React.cloneElement(
          td,
          {},
          makeCellContent
            ? makeCellContent(row, idCol)
            : row[idCol]
            ? row[idCol]
            : null
        );
      });

      return React.cloneElement(tr, {}, cells);
    });
  };

  return (
    <div
      id={id}
      data-slot="container"
      className={`bg-content1 rounded-lg overflow-auto${
        className ? " " + className : ""
      }`}
    >
      <table
        aria-label={ariaLabel ? ariaLabel : undefined}
        className={
          "h-auto table-auto w-full" +
          (classNames_.table ? " " + classNames_.table : "")
        }
      >
        {captionContent && (
          <caption
            className={
              "p-2" + classNames_.caption ? " " + classNames_.caption : ""
            }
          >
            {captionContent}
          </caption>
        )}

        <thead
          className={
            "bg-content2 p-4" +
            (classNames_.thead ? " " + classNames_.thead : "")
          }
        >
          <tr
            data-slot="theadRow"
            className={
              "pb-4" + (classNames_.theadRow ? " " + classNames_.theadRow : "")
            }
          >
            {columns_.map((col, i) => {
              let key: number | string = i;
              let content: string | React.ReactElement = "";

              if (typeof col === "string") {
                key = col;
                content = col;
              } else if (typeof col === "object") {
                key = col?.id || col?.key || i;
                content = col?.label;
              }

              if (makeHeaderCell) content = makeHeaderCell(col);

              return (
                <th
                  key={key}
                  data-slot="th"
                  className={
                    "p-3 align-middle bg-default-200 whitespace-nowrap font-semibold first:rounded-l-lg last:rounded-r-lg" +
                    (classNames_.th ? " " + classNames_.th : "")
                  }
                >
                  {content}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className={classNames_.tbody ? classNames_.tbody : undefined}>
          {isLoading ? (
            <tr>
              <td colSpan={columns_.length} className="text-center p-4">
                <CircularProgress className="self-center" />
              </td>
            </tr>
          ) : !rows?.length ? (
            <tr>
              <td
                colSpan={columns_.length}
                className="text-center p-4 text-3xl"
              >
                {emptyMessage || "Sin elementos"}
              </td>
            </tr>
          ) : (
            rows_()
          )}
        </tbody>

        {tfootContent && (
          <tfoot className={classNames_.tfoot ? classNames_.tfoot : undefined}>
            <tr>
              <th colSpan={columns_.length}>{tfootContent}</th>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default TableCustom;
