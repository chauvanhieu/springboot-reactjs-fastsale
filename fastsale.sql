-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 17, 2023 lúc 08:30 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `fastsale`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `shop_id`, `status`) VALUES
(1, 'Category 1', 1, 1),
(2, 'Category 2', 1, 1),
(3, 'Category 3', 2, 1),
(4, 'Category 4', 2, 1),
(5, 'Category 5', 3, 1),
(6, 'Category 6', 3, 1),
(7, 'Category 7', 4, 1),
(8, 'Category 8', 4, 1),
(9, 'Category 9', 5, 1),
(10, 'Category 10', 5, 1),
(11, 'Category new', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `created_at` date NOT NULL,
  `order_type` varchar(10) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `shop_id`, `user_id`, `price`, `created_at`, `order_type`, `status`) VALUES
(1, 1, 1, 100, '2023-07-14', 'EXPORT', 1),
(2, 1, 2, 200, '2023-07-14', 'IMPORT', 1),
(3, 2, 3, 150, '2023-07-14', 'EXPORT', 1),
(4, 2, 4, 180, '2023-07-14', 'IMPORT', 1),
(5, 3, 5, 120, '2023-07-14', 'EXPORT', 1),
(6, 3, 6, 90, '2023-07-14', 'IMPORT', 1),
(7, 4, 7, 160, '2023-07-14', 'EXPORT', 1),
(8, 4, 8, 140, '2023-07-14', 'IMPORT', 1),
(9, 5, 9, 110, '2023-07-14', 'EXPORT', 1),
(10, 5, 10, 170, '2023-07-14', 'IMPORT', 1),
(11, 1, 1, 102220, '2023-07-14', 'EXPORT', 1),
(12, 1, 1, 12220330, '2023-07-14', 'EXPORT', 1),
(13, 1, 1, 12220330, '2023-07-14', 'EXPORT', 1),
(14, 1, 1, 2, '2023-07-14', 'EXPORT', 1),
(15, 1, 1, 2, '2023-07-14', 'EXPORT', 1),
(16, 1, 1, 126663, '2023-07-14', 'EXPORT', 1),
(17, 1, 1, 2, '2023-07-14', 'EXPORT', 1),
(18, 1, 1, 2, '2023-07-14', 'EXPORT', 1),
(19, 1, 1, 2, '2023-07-14', 'EXPORT', 1),
(20, 1, 1, 2, '2023-07-14', 'IMPORT', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `count`, `status`) VALUES
(1, 1, 1, 22, 1),
(2, 1, 2, 22, 1),
(3, 2, 3, 1, 1),
(4, 2, 4, 4, 1),
(5, 3, 5, 2, 1),
(6, 3, 6, 3, 1),
(7, 4, 7, 1, 1),
(8, 4, 8, 4, 1),
(9, 5, 9, 2, 1),
(10, 5, 10, 3, 1),
(11, 1, 1, 22, 1),
(12, 1, 2, 22, 1),
(13, 1, 1, 22, 1),
(14, 1, 2, 22, 1),
(17, 17, 1, 25, 1),
(18, 17, 2, 22, 1),
(19, 18, 1, 25, 1),
(20, 18, 2, 22, 1),
(95, 16, 1, 3, 1),
(96, 16, 2, 3, 1),
(97, 19, 1, 25, 1),
(98, 19, 2, 22, 1),
(99, 20, 1, 25, 1),
(100, 20, 2, 22, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` double NOT NULL,
  `category_id` int(11) NOT NULL,
  `available` int(11) NOT NULL,
  `import_price` double NOT NULL,
  `shop_id` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `category_id`, `available`, `import_price`, `shop_id`, `status`) VALUES
(1, 'Product 1', 10, 1, 375, 5, 1, 1),
(2, 'Product 2', 20, 1, 266, 10, 1, 1),
(3, 'Product 3', 15, 2, 493, 7, 2, 1),
(4, 'Product 4', 18, 2, 20, 8, 2, 1),
(5, 'Product 5', 12, 3, 10, 6, 3, 1),
(6, 'Product 6', 9, 3, 5, 4, 3, 1),
(7, 'Product 7', 16, 4, 15, 8, 4, 1),
(8, 'Product 8', 14, 4, 25, 7, 4, 1),
(9, 'Product 9', 11, 5, 35, 6, 5, 1),
(10, 'Product 10', 17, 5, 45, 9, 5, 1),
(11, 'Product hello update', 10, 2, 50, 5, 1, 0),
(12, 'Product new', 10, 1, 50, 5, 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(30) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `user_id`) VALUES
(1, 'ROLE_ADMIN', 1),
(2, 'ROLE_USER_PRODUCT', 1),
(3, 'ROLE_USER_CATEGORY', 1),
(4, 'ROLE_USER_ORDER', 1),
(5, 'ROLE_USER_IMPORT', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `shop`
--

INSERT INTO `shop` (`id`, `name`, `status`) VALUES
(1, 'Shop 132222', 1),
(2, 'Shop 2', 1),
(3, 'Shop 3', 1),
(4, 'Shop 4', 1),
(5, 'Shop 5', 1),
(6, 'Shop 6', 1),
(7, 'Shop 7', 1),
(8, 'Shop 8', 1),
(9, 'Shop 9', 1),
(10, 'Shop 10', 1),
(11, 'Shop new', 1),
(12, 'Shop new', 1),
(13, 'Shop new', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `shop_id`, `status`) VALUES
(1, 'User 1', 'user1@example.com', '$2a$10$a9CuhnIXcNNKKBA2NVLw2elpz0Si6ztsQkiArhe5SswvN3IlzvUBe', 1, 1),
(2, 'User 2', 'user2@example.com', '$2a$10$F5SQ6oMWGRmIvxz5vUW5dOl6LbROqskBUQPBWnzh9V5CMb898AZSK', 1, 1),
(3, 'User 3', 'user3@example.com', '$2a$10$gZwou6BJd.6JRZi0DTJLT.noxmCtIbNirW6BbMEyv6z8fj/sAcYhy', 2, 1),
(4, 'User 4', 'user4@example.com', 'password4', 2, 1),
(5, 'User 5', 'user5@example.com', 'password5', 3, 1),
(6, 'User 6', 'user6@example.com', 'password6', 3, 1),
(7, 'User 7', 'user7@example.com', 'password7', 4, 1),
(8, 'User 8', 'user8@example.com', 'password8', 4, 1),
(9, 'User 9', 'user9@example.com', 'password9', 5, 1),
(10, 'User 10', 'user10@example.com', 'password10', 5, 1),
(11, 'User new', 'user1d@example.com', '123123', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`) VALUES
(1, 1, 1),
(3, 1, 3),
(5, 1, 5),
(7, 1, 4),
(9, 1, 2),
(11, 2, 4),
(12, 3, 3),
(13, 3, 3);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `FK4q98utpd73imf4yhttm3w0eax` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Chỉ mục cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `FK4q98utpd73imf4yhttm3w0eax` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Các ràng buộc cho bảng `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `FK97mxvrajhkq19dmvboprimeg1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`);

--
-- Các ràng buộc cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
