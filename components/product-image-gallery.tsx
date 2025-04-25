"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductImageGalleryProps {
  mainImage: string
  images: string[]
  productName: string
}

export default function ProductImageGallery({ mainImage, images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image src={selectedImage || "/placeholder.svg"} alt={productName} fill className="object-cover" />
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
              selectedImage === image ? "ring-2 ring-black" : "ring-1 ring-gray-200"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
