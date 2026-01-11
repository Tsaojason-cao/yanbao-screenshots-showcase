CREATE TABLE `apkDownloads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`version` varchar(20) NOT NULL,
	`ipAddress` varchar(45),
	`userAgent` text,
	`referrer` text,
	`downloadedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `apkDownloads_id` PRIMARY KEY(`id`)
);
