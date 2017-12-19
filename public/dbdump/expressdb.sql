-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2017 at 08:41 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expressdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `emp_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `phone` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `created_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`emp_id`, `first_name`, `last_name`, `phone`, `email`, `created_date`) VALUES
(4, '6666Test6666', 'User', 2147483647, 'test@gmail.com', '2016-09-24'),
(5, 'new srikanth', 'kkk', 2147483647, 'kkk@gmail..com', '2016-09-24'),
(6, 'new srikanth', 'kkk', 2147483647, 'kkk@gmail..com', '2016-09-24'),
(7, 'new srikanth', 'kkk', 2147483647, 'kkk@gmail..com', '2016-09-24'),
(8, 'new srikanth', 'kkk', 2147483647, 'kkk@gmail..com', '2016-09-24'),
(9, 'new srikanth', 'kkk', 2147483647, 'kkk@gmail..com', '2016-09-24'),
(10, 'new srikanth', 'kkk', 2147483647, 'kkk@gmail..com', '2016-09-24'),
(11, 'new srikanth', 'kkk', 2147483647, 'kkk@gmail..com', '2016-09-24'),
(12, 'new srikanth', 'kkk', 2147483647, 'kkk@gmail..com', '2016-09-24'),
(13, 'vxcvxvxcv', 'vvcxvcv', 2147483647, 'vsfsdfsdf@fsdfsdf.ghj', '2017-12-19'),
(16, 'sdfsfsdf', 'sdfsfsdf', 0, 'sdfsdfsdf', '2017-12-20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'srikanth@shenll.com', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
