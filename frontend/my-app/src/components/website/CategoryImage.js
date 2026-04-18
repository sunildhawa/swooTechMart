"use client";

export default function CategoryImage({ src, name }) {
  return (
    <img
      src={src}
      alt={name}
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/300?text=" + name;
      }}
    />
  );
}