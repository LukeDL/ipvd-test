-- CreateTable
CREATE TABLE "CostCenters" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(255),
    "name" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CostCenters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departaments" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "costCenterId" VARCHAR(255),
    "leaderId" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Departaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "uuid" TEXT NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "departamentId" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "sessionId" TEXT NOT NULL,
    "userId" VARCHAR(255),
    "expires" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("sessionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CostCenters_code_key" ON "CostCenters"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Departaments" ADD CONSTRAINT "Departaments_costCenterId_fkey" FOREIGN KEY ("costCenterId") REFERENCES "CostCenters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "Departaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
