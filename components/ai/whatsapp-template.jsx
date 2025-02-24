"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "../dashboard/shared/ui/card"
import { Copy, Eye, EyeOff } from "lucide-react"
import { Button } from "../dashboard/shared/ui/button"
import Image from 'next/image'

export function WhatsAppBusinessTemplate({ template }) {
  const [isRevealed, setIsRevealed] = useState(false)

  const toggleReveal = () => setIsRevealed(!isRevealed)

  const copyToClipboard = () => {
    const fullTemplate = `${template.header}\n\n${template.body}\n\n${template.footer}`
    navigator.clipboard.writeText(fullTemplate).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The template has been copied to your clipboard.",
      })
    })
  }

  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-lg">
      <CardHeader className="bg-green-600 text-white p-3">
        <h3 className="font-semibold text-sm">WhatsApp Business Template</h3>
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        <div className="relative w-full h-32">
          <Image
            src="/og-image.jpeg.svg?height=128&width=256"
            alt="Product Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className={`space-y-2 ${isRevealed ? '' : 'blur-sm'} transition-all duration-300`}>
          <h4 className="font-bold text-sm">{template.header}</h4>
          <p className="text-sm">{template.body}</p>
          <p className="text-xs text-gray-500">{template.footer}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 p-3 bg-gray-50">
        {template.buttons.map((button, index) => (
          <Button key={index} variant="outline" size="sm" className="w-full justify-center">
            {button}
          </Button>
        ))}
        <div className="flex justify-end items-center w-full mt-2 space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleReveal}
            className="text-blue-500 hover:text-blue-700"
          >
            {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className="text-blue-500 hover:text-blue-700"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

