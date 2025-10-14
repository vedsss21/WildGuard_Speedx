
"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { recentIncidentsData as data } from "@/lib/data";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { useTranslation } from "@/contexts/language-context";
import { useSearch } from "@/contexts/search-context";

type Incident = {
  id: string;
  type: string;
  location: string;
  date: string;
  status: "Resolved" | "Active" | "Pending";
  actionTaken: string;
};

export default function IncidentsPage() {
  const { t } = useTranslation();
  const { searchQuery } = useSearch();

  const columns: ColumnDef<Incident>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={t('incidents.table.selectAll')}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={t('incidents.table.selectRow')}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: t('incidents.table.incidentId'),
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t('incidents.table.type')}
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const type = row.getValue("type") as string;
        return <div>{t(`incidentTypes.${type.toLowerCase().replace(/ /g, '')}` as any)}</div>
      }
    },
    {
      accessorKey: "location",
      header: t('incidents.table.location'),
    },
    {
      accessorKey: "date",
      header: t('incidents.table.date'),
    },
    {
      accessorKey: "status",
      header: t('incidents.table.status'),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "Resolved"
                ? "default"
                : status === "Active"
                ? "destructive"
                : "secondary"
            }
            className={cn(
              status === "Resolved" &&
                "bg-green-600/20 text-green-700 hover:bg-green-600/30 border-green-600/20",
              status === "Active" &&
                "bg-red-600/20 text-red-700 hover:bg-red-600/30 border-red-600/20"
            )}
          >
            {t(`incidentStatuses.${status.toLowerCase()}` as any)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "actionTaken",
      header: t('incidents.table.actionTaken'),
      cell: ({row}) => {
        const action = row.getValue("actionTaken") as string;
        const key = action.toLowerCase().replace(/\. /g, ' ').replace(/\./g, '').replace(/ /g, '-');
        return t(`actionsTaken.${key}` as any)
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const incident = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t('incidents.table.actions.openMenu')}</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('incidents.table.actions.title')}</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(incident.id)}
              >
                {t('incidents.table.actions.copyId')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t('incidents.table.actions.viewDetails')}</DropdownMenuItem>
              <DropdownMenuItem>{t('incidents.table.actions.assignRanger')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    table.getColumn("location")?.setFilterValue(searchQuery);
  }, [searchQuery, table]);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        {t('nav.manageIncidents')}
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('incidents.log.title')}</CardTitle>
          <CardDescription>
            {t('incidents.log.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder={t('incidents.filterPlaceholder')}
              value={
                (table.getColumn("location")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("location")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  {t('incidents.columnsButton')} <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    const translationKey = `incidents.table.${column.id}`;
                    let translation = t(translationKey);
                    if (typeof translation === 'object' && column.id === 'actions') {
                      translation = t('incidents.table.actions.title');
                    } else if (typeof translation === 'object') {
                      translation = column.id; // Fallback to column id
                    }
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {translation}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {t('incidents.noResults')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {t('incidents.selectedRows', {
                selected: table.getFilteredSelectedRowModel().rows.length,
                total: table.getFilteredRowModel().rows.length,
              })}
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {t('incidents.previous')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {t('incidents.next')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
