# Leals Christmas Wishes V2

Leal's Christmas Wishes is a private, full-stack application built exclusively for my family to help organize and share our Christmas lists for the upcoming year. This version is a major upgrade from the original, where I previously used GraphQL. Now, I've leveraged the power of Next.js, Prisma, and NextAuth to create a more versatile and user-friendly experience for my family.

- **Home Page:** A dynamic page that fetches and displays all family members. Each member is represented by a card featuring their Memoji and name. Clicking on a card navigates the user to a detailed page for that member.
- **Member Page:** Displays the member's Memoji along with their full Christmas wishlist. Users can open a modal form to add or remove items from the list. A second modal provides important member information, such as clothing sizes for pants, shirts, and more.

## Features

- **Dynamic Routing:** Leveraging Next.js for server-side rendering and routing, ensuring fast and efficient page loading.
- **Responsive Design:** Tailwind CSS is utilized to ensure a visually appealing and responsive layout across devices.
- **Ease of Maintenance:** The modular structure of React components and the utility-first approach of Tailwind CSS make the codebase easy to maintain and extend.
- **Security:** Implemented NextAuth to safeguard API endpoints and restrict access to pages, ensuring that only users who know the password can view or interact with the application. This provides a secure experience, protecting user data and maintaining privacy across the platform.

## Technologies

- **NextUI:** https://nextui.org/
- **Vercel:** https://vercel.com/home
- **DaisyUI:** https://daisyui.com/
- **Framer-Motion:** https://www.framer.com/motion/
- **Next-Auth:** https://next-auth.js.org/
- **Yes-Icons:** https://yesicon.app/
- **AWS S3 Bucket:** https://aws.amazon.com/s3/

## Desktop View

## Live

- [Leal's Christmas Wishes](https://christmaslist-v2.vercel.app)

## License

This project is licensed under the [MIT License](LICENSE).

---
