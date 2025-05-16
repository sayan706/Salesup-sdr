"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Download, Filter, Search, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface DataTableProps<T> {
  data: T[]
  columns: {
    key: string
    title: string
    renderType?: string // Use a string identifier instead of a function
  }[]
  searchKeys?: string[]
  hiddenColumns?: string[]
  title: string
}

export default function DataTable<T extends Record<string, any>>({
  data = [],
  columns = [],
  searchKeys = [],
  hiddenColumns = [],
  title = "Data",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState<T[]>(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key).filter((key) => !hiddenColumns.includes(key)),
  )
  const itemsPerPage = 10

  // Safety check for empty data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-4 text-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-500">No data available</p>
        </CardContent>
      </Card>
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setCurrentPage(1)

    if (!value.trim()) {
      setFilteredData(data)
      return
    }

    try {
      const filtered = data.filter((item) => {
        return searchKeys.some((key) => {
          const itemValue = item[key]
          if (typeof itemValue === "string") {
            return itemValue.toLowerCase().includes(value.toLowerCase())
          }
          return false
        })
      })
      setFilteredData(filtered)
    } catch (error) {
      console.error("Error filtering data:", error)
      setFilteredData(data)
    }
  }

  const handleExport = () => {
    // In a real app, this would generate and download an Excel file
    // For now, we'll just alert
    const toast = document.createElement("div")
    toast.className =
      "fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 rounded-md shadow-lg p-4 transition-all duration-500 transform translate-y-0 opacity-100 z-50"
    toast.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Exporting data to Excel...</span>
      </div>
    `
    document.body.appendChild(toast)

    // Animate out after 3 seconds
    setTimeout(() => {
      toast.style.opacity = "0"
      toast.style.transform = "translateY(-20px)"
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 500)
    }, 3000)
  }

  const toggleColumnVisibility = (key: string) => {
    if (visibleColumns.includes(key)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== key))
    } else {
      setVisibleColumns([...visibleColumns, key])
    }
  }

  const resetColumnVisibility = () => {
    setVisibleColumns(columns.map((col) => col.key).filter((key) => !hiddenColumns.includes(key)))
  }

  // Filter columns based on visibility
  const displayColumns = columns.filter((col) => visibleColumns.includes(col.key))

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Internal render function based on renderType
  const renderCell = (column: { key: string; renderType?: string }, value: any, item: T) => {
    if (!column.renderType) {
      return value !== undefined && value !== null ? String(value) : "N/A"
    }

    switch (column.renderType) {
      case "pocStatus":
        return (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium inline-block
            ${
              value === "Active"
                ? "bg-green-100 text-green-800"
                : value === "Inactive"
                  ? "bg-gray-100 text-gray-800"
                  : value === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : value === "Qualified"
                      ? "bg-blue-100 text-blue-800"
                      : value === "Not Interested"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
            }`}
          >
            {value || "Unknown"}
          </div>
        )
      case "crmStatus":
        return (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium inline-block
            ${
              value === "New"
                ? "bg-blue-100 text-blue-800"
                : value === "Contacted"
                  ? "bg-yellow-100 text-yellow-800"
                  : value === "Qualified"
                    ? "bg-green-100 text-green-800"
                    : value === "Meeting Set"
                      ? "bg-purple-100 text-purple-800"
                      : value === "Closed Won"
                        ? "bg-emerald-100 text-emerald-800"
                        : value === "Closed Lost"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
            }`}
          >
            {value || "Unknown"}
          </div>
        )
      default:
        return value !== undefined && value !== null ? String(value) : "N/A"
    }
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 animate-fade-in">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex items-center gap-2">
            <div className="relative input-focus-effect">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full sm:w-[300px] pl-8 bg-gray-50 border-gray-200 focus:bg-white transition-all btn-animate"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="bg-gray-50 border-gray-200 hover:bg-white btn-animate">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Filter by Name</DropdownMenuItem>
                <DropdownMenuItem>Filter by Status</DropdownMenuItem>
                <DropdownMenuItem>Filter by Date</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="bg-gray-50 border-gray-200 hover:bg-white btn-animate">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2">
                  <p className="font-medium text-sm">Column Visibility</p>
                  <p className="text-xs text-gray-500">Select columns to display</p>
                </div>
                <DropdownMenuSeparator />
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    checked={visibleColumns.includes(column.key)}
                    onCheckedChange={() => toggleColumnVisibility(column.key)}
                  >
                    {column.title}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button variant="ghost" size="sm" className="w-full" onClick={resetColumnVisibility}>
                    Reset Columns
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              onClick={handleExport}
              className="bg-gray-50 border-gray-200 hover:bg-white btn-animate"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-md border border-gray-200 overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {displayColumns.map((column) => (
                    <TableHead key={column.key} className="font-semibold">
                      {column.title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 transition-colors table-row-animate">
                      {displayColumns.map((column) => (
                        <TableCell key={`${index}-${column.key}`}>
                          {renderCell(column, item[column.key], item)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={displayColumns.length} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 animate-fade-in">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
              {filteredData.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 btn-animate"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNumber = i + 1
                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                    className="h-8 w-8 btn-animate"
                  >
                    {pageNumber}
                  </Button>
                )
              })}
              {totalPages > 5 && <span className="px-2">...</span>}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 btn-animate"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
