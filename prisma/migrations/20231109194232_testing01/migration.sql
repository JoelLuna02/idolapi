-- CreateTable
CREATE TABLE "VTuber" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "fanname" TEXT NOT NULL,
    "branch" TEXT NOT NULL DEFAULT 'Hebrew',
    "unit" TEXT NOT NULL,
    "graduated" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "VTuber_fullname_key" ON "VTuber"("fullname");

-- CreateIndex
CREATE UNIQUE INDEX "VTuber_fanname_key" ON "VTuber"("fanname");
