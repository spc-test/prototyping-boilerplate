"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface Product {
  id: string
  name: string
  description: string
  image: string
  basePrice: number
  currency?: string
  category?: string
  inStock?: boolean
}

interface PackOption {
  value: number
  label: string
  discount: number
  popular?: boolean
}

interface ProductCardProps {
  product: Product
  packOptions?: PackOption[]
  className?: string
  onAddToCart?: (product: Product, packSize: number, totalPrice: number) => void
}

const defaultPackOptions: PackOption[] = [
  { value: 3, label: "3 items", discount: 0 },
  { value: 6, label: "6 items", discount: 0.1, popular: true },
  { value: 9, label: "9 items", discount: 0.15 },
]

export function ProductCard({
  product,
  packOptions = defaultPackOptions,
  className,
  onAddToCart,
}: ProductCardProps) {
  const [selectedPack, setSelectedPack] = useState<number>(packOptions[0].value)

  const selectedOption = packOptions.find((option) => option.value === selectedPack)
  const baseTotal = product.basePrice * selectedPack
  const discountAmount = baseTotal * (selectedOption?.discount || 0)
  const totalPrice = baseTotal - discountAmount

  const handleAddToCart = () => {
    onAddToCart?.(product, selectedPack, totalPrice)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: product.currency || "USD",
    }).format(price)
  }

  return (
    <Card className={cn("w-full max-w-sm overflow-hidden", className)}>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {product.category && (
          <Badge className="absolute left-2 top-2" variant="secondary">
            {product.category}
          </Badge>
        )}
        {!product.inStock && (
          <Badge className="absolute right-2 top-2" variant="destructive">
            Out of Stock
          </Badge>
        )}
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Pack size:</label>
          <Select value={selectedPack.toString()} onValueChange={(value) => setSelectedPack(Number(value))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {packOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    {option.popular && (
                      <Badge variant="default" className="ml-2 text-xs">
                        Popular
                      </Badge>
                    )}
                    {option.discount > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        -{Math.round(option.discount * 100)}%
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Unit price:</span>
            <span className="text-sm">{formatPrice(product.basePrice)}</span>
          </div>
          {selectedOption?.discount > 0 && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal:</span>
                <span className="text-sm line-through text-muted-foreground">
                  {formatPrice(baseTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Discount (-{Math.round(selectedOption.discount * 100)}%):
                </span>
                <span className="text-sm text-green-600">
                  -{formatPrice(discountAmount)}
                </span>
              </div>
            </>
          )}
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="font-medium">Total:</span>
            <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}