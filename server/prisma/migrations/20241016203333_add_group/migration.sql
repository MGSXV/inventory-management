-- CreateTable
CREATE TABLE "depots" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "state" "EState" NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by_id" TEXT,

    CONSTRAINT "depots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDepot" (
    "user_id" TEXT NOT NULL,
    "depot_id" TEXT NOT NULL,

    CONSTRAINT "UserDepot_pkey" PRIMARY KEY ("user_id","depot_id")
);

-- CreateTable
CREATE TABLE "_DepotToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DepotToUser_AB_unique" ON "_DepotToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DepotToUser_B_index" ON "_DepotToUser"("B");

-- AddForeignKey
ALTER TABLE "depots" ADD CONSTRAINT "depots_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDepot" ADD CONSTRAINT "UserDepot_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDepot" ADD CONSTRAINT "UserDepot_depot_id_fkey" FOREIGN KEY ("depot_id") REFERENCES "depots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepotToUser" ADD CONSTRAINT "_DepotToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "depots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepotToUser" ADD CONSTRAINT "_DepotToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
