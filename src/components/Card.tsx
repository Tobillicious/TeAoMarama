import React from "react";

export type CardProps = {
  title: string;
  description?: string;
};

export const Card: React.FC<CardProps> = ({title, description}) => (
  <article className="bg-white rounded-md p-5 shadow-sm border border-transparent hover:shadow-md transition-shadow">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted">{description}</p>
  </article>
);

export default Card;
