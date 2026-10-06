import {
  PrismaClient,
  UserRole,
  ReservationStatus,
} from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  console.log("🌱 Starting database seed...");

  // =====================================================
  // 1. USERS
  // =====================================================

  const admin = await prisma.user.create({
    data: {
      username: "admin",
      passwordHash: "admin123", // Replace with a hashed password in production
      role: UserRole.admin,
    },
  });

  console.log("✅ Admin created");

  // =====================================================
  // 2. CATEGORIES
  // =====================================================

  const cakes = await prisma.category.create({
    data: {
      name: "Cakes",
    },
  });

  const arabicSweets = await prisma.category.create({
    data: {
      name: "Arabic Sweets",
    },
  });

  const chocolates = await prisma.category.create({
    data: {
      name: "Chocolates",
    },
  });

  console.log("✅ Categories created");

  // =====================================================
  // 3. SWEETS
  // =====================================================

  const chocolateCake = await prisma.sweet.create({
    data: {
      categoryId: cakes.categoryId,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with chocolate cream.",
      price: 15.0,
      imageUrl: "/images/chocolate-cake.jpg",
    },
  });

  const vanillaCake = await prisma.sweet.create({
    data: {
      categoryId: cakes.categoryId,
      name: "Vanilla Cake",
      description: "Soft vanilla cake with fresh cream.",
      price: 12.0,
      imageUrl: "/images/vanilla-cake.jpg",
    },
  });

  const baklava = await prisma.sweet.create({
    data: {
      categoryId: arabicSweets.categoryId,
      name: "Baklava",
      description: "Traditional Lebanese baklava with pistachios.",
      price: 8.0,
      imageUrl: "/images/baklava.jpg",
    },
  });

  const maamoul = await prisma.sweet.create({
    data: {
      categoryId: arabicSweets.categoryId,
      name: "Maamoul",
      description: "Traditional Lebanese maamoul filled with dates.",
      price: 7.0,
      imageUrl: "/images/maamoul.jpg",
    },
  });

  const chocolateBox = await prisma.sweet.create({
    data: {
      categoryId: chocolates.categoryId,
      name: "Chocolate Box",
      description: "Assorted premium chocolates.",
      price: 20.0,
      imageUrl: "/images/chocolate-box.jpg",
    },
  });

  console.log("✅ Sweets created");

  // =====================================================
  // 4. PROMOTIONS
  // =====================================================

  const chocolateCakePromotion = await prisma.promotion.create({
    data: {
      sweetId: chocolateCake.sweetId,
      discountPercentage: 15.0,
      validFrom: new Date("2026-10-01"),
      validTo: new Date("2026-12-31"),
      isActive: true,
    },
  });

  const baklavaPromotion = await prisma.promotion.create({
    data: {
      sweetId: baklava.sweetId,
      discountPercentage: 10.0,
      validFrom: new Date("2026-10-01"),
      validTo: new Date("2026-11-30"),
      isActive: true,
    },
  });

  const chocolateBoxPromotion = await prisma.promotion.create({
    data: {
      sweetId: chocolateBox.sweetId,
      discountPercentage: 20.0,
      validFrom: new Date("2026-10-01"),
      validTo: new Date("2026-12-31"),
      isActive: true,
    },
  });

  console.log("✅ Promotions created");

  // =====================================================
  // 5. RESERVATIONS
  // =====================================================

  const reservation1 = await prisma.reservation.create({
    data: {
      userId: admin.userId,
      promotionId: chocolateCakePromotion.promotionId,
      guestName: "Nabil Yahya",
      phoneNumber: "70123456",
      reservationDate: new Date("2026-10-15"),
      reservationTime: new Date("1970-01-01T18:30:00"),
      numberOfGuests: 4,
      description: "Birthday celebration.",
      status: ReservationStatus.approved,
    },
  });

  const reservation2 = await prisma.reservation.create({
    data: {
      guestName: "Ahmad Hassan",
      phoneNumber: "71123456",
      reservationDate: new Date("2026-10-18"),
      reservationTime: new Date("1970-01-01T20:00:00"),
      numberOfGuests: 2,
      description: "Family dinner.",
      status: ReservationStatus.pending,
    },
  });

  const reservation3 = await prisma.reservation.create({
    data: {
      userId: admin.userId,
      guestName: "Omar Khalil",
      phoneNumber: "76123456",
      reservationDate: new Date("2026-10-20"),
      reservationTime: new Date("1970-01-01T19:00:00"),
      numberOfGuests: 6,
      description: "Family gathering.",
      status: ReservationStatus.approved,
    },
  });

  console.log("✅ Reservations created");

  // =====================================================
  // 6. REVIEWS
  // =====================================================

  await prisma.review.create({
    data: {
      reservationId: reservation1.reservationId,
      userId: admin.userId,
      rating: 5,
      comment: "Excellent sweets and great service!",
    },
  });

  await prisma.review.create({
    data: {
      reservationId: reservation3.reservationId,
      userId: admin.userId,
      rating: 4,
      comment: "Very good experience. The sweets were delicious.",
    },
  });

  console.log("✅ Reviews created");

  // =====================================================
  // 7. ANNOUNCEMENTS
  // =====================================================

  await prisma.announcement.create({
    data: {
      title: "Welcome to Ashrafi Sweets",
      content:
        "Welcome to Ashrafi Sweets! Discover our delicious cakes, Arabic sweets, and premium chocolates.",
      isVisible: true,
    },
  });

  await prisma.announcement.create({
    data: {
      title: "Special October Promotion",
      content: "Enjoy special discounts on selected sweets throughout October.",
      isVisible: true,
    },
  });

  await prisma.announcement.create({
    data: {
      title: "New Products Available",
      content:
        "We have added new cakes and premium chocolate boxes to our menu.",
      isVisible: true,
    },
  });

  console.log("✅ Announcements created");

  console.log("🎉 Database seeded successfully!");
}

// =====================================================
// ERROR HANDLING
// =====================================================

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
