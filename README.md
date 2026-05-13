# Cairo Food International — Next.js Website

Pixel-oriented implementation based on the supplied exported Figma screenshots.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Data-driven products structure
- Reusable sections and components

## Run locally

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Main editable files

### Products

Edit products from:

```txt
src/data/products.ts
```

Every product supports:

- name
- slug
- category
- origin
- export type
- season
- main/card/packing images
- short description
- full description
- default packing
- sizes
- variants

Product listing and product details pages are generated automatically from this file.

### Company content

```txt
src/data/company.ts
```

### Navigation

```txt
src/data/navigation.ts
```

### Certificates

```txt
src/data/certificates.ts
```

### Images

Replace placeholder/cropped reference images inside:

```txt
public/images
```

Recommended final replacement folders:

```txt
public/images/brand
public/images/hero
public/images/products
public/images/certificates
public/images/gallery
public/images/about
```

## Pages included

- `/` Home
- `/about` About Us
- `/products` Products
- `/products/[slug]` Product Details
- `/certificates` Certificates

## Notes

The implementation uses the exported screenshots as the visual reference, including the dark navy header/footer, green accent system, cards, product listing layout, quality process, certificates, contact form, product detail cards, and mobile responsive structure.
