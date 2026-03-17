import * as React from "react"

import { cn } from "../../lib/utils"

const Avatar = ({ className, children, ...props }) => {
  return (
    <div
      role="img"
      className={cn("inline-flex h-10 w-10 overflow-hidden rounded-full bg-gray-100", className)}
      {...props}
    >
      {children}
    </div>
  )
}

const AvatarImage = ({ src, alt = "avatar", className, ...props }) => {
  return (
    <img src={src} alt={alt} className={cn("h-full w-full object-cover", className)} {...props} />
  )
}

export { Avatar, AvatarImage }