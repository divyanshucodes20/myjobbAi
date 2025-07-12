"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Package, Star, DollarSign, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductSearch from "./product-search"

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string | null
  category: string
  thumbnail: string
  images: string[]
}

interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function ProductsOverview() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    averagePrice: 0,
    averageRating: 0,
    totalValue: 0,
    categoryData: [] as { name: string; value: number }[],
    priceRanges: [] as { range: string; count: number }[],
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(0)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100")
      const data: ProductsResponse = await response.json()
      setProducts(data.products)
      calculateAnalytics(data.products)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = (products: Product[], query: string, category: string) => {
    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(query.toLowerCase()))

      const matchesCategory = !category || product.category === category

      return matchesSearch && matchesCategory
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setCurrentPage(1)
  }
  const categories = [...new Set(products.map((p) => p.category))]

  const calculateAnalytics = (products: Product[]) => {
    const totalProducts = products.length
    const averagePrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts
    const averageRating = products.reduce((sum, p) => sum + p.rating, 0) / totalProducts
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

    const categoryCount = products.reduce(
      (acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }))

    const priceRanges = [
      { range: "$0-$50", count: 0 },
      { range: "$51-$100", count: 0 },
      { range: "$101-$500", count: 0 },
      { range: "$501-$1000", count: 0 },
      { range: "$1000+", count: 0 },
    ]

    products.forEach((p) => {
      if (p.price <= 50) priceRanges[0].count++
      else if (p.price <= 100) priceRanges[1].count++
      else if (p.price <= 500) priceRanges[2].count++
      else if (p.price <= 1000) priceRanges[3].count++
      else priceRanges[4].count++
    })

    setAnalytics({
      totalProducts,
      averagePrice,
      averageRating,
      totalValue,
      categoryData,
      priceRanges,
    })

    setTotalPages(Math.ceil(products.length / itemsPerPage))
  }

  useEffect(() => {
    if (products.length > 0) {
      const filtered = filterProducts(products, searchQuery, selectedCategory)
      setFilteredProducts(filtered)
      setTotalPages(Math.ceil(filtered.length / itemsPerPage))
      if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
        setCurrentPage(1)
      }
    }
  }, [products, searchQuery, selectedCategory, itemsPerPage, currentPage])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.averagePrice.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per product</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Stock × Price</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Products by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Products",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Distribution</CardTitle>
            <CardDescription>Products by price range</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Products",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.priceRanges}>
                  <XAxis dataKey="range" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
       {/* Search and Filter */}
      <ProductSearch
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        onClearFilters={handleClearFilters}
        categories={categories}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products Catalog</CardTitle>
              <CardDescription>Complete list of all products</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">per page</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Discount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.thumbnail || "/placeholder.svg"}
                          alt={product.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">{product.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {product.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.stock > 50 ? "default" : "destructive"}>{product.stock}</Badge>
                    </TableCell>
                    <TableCell>
                      {product.discountPercentage > 0 && (
                        <Badge variant="outline">-{product.discountPercentage}%</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}{" "}
              products
              {(searchQuery || selectedCategory) && (
                <span className="ml-2 text-blue-600">(filtered from {products.length} total)</span>
              )}
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(page as number)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
