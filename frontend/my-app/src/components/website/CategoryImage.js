"use client";

export default function CategoryImage({ src, name }) {
  return (
    <img
      src={src}
      alt={name}
    />
  );
}