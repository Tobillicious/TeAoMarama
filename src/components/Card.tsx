import React from 'react'

export type CardProps = {,
title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = (_{title,  _description,  _children,  _className = ""}) => (
  <article className={`bg-brand-surface rounded-md p-5 shadow-sm border border-brand-muted/10 hover: shadow-md hover:border-brand-muted/20 transition-all duration-200 ${className}`}>
    <h3 className="font-semibold mb-2 text-brand-text tracking-sub">{title}</h3>
    {description && <p className="text-sm text-brand-muted mb-3">{description}</p>}
    {children}
  </article>
)

export default Card
