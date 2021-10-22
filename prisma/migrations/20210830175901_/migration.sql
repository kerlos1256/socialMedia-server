-- AlterTable
ALTER TABLE `comment` ADD COLUMN `reactionsLength` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `commentsLength` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `reactionsLength` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `reactions` ADD COLUMN `commentReactionsLength` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `postsReactionsLength` INTEGER NOT NULL DEFAULT 0;
