import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create Admin
  const adminEmail = "admin@dooramobility.com";
  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("admin123", 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        name: "DOORA Admin",
        passwordHash,
      },
    });
    console.log("✅ Admin user created.");
  } else {
    console.log("✅ Admin user already exists.");
  }

  // 2. Create Business Settings
  const settings = await prisma.businessSettings.findUnique({ where: { id: 1 } });
  if (!settings) {
    await prisma.businessSettings.create({
      data: {
        whatsappNumber: "1234567890",
        email: "contact@dooramobility.com",
        officeAddress: "123 Premium Way, Luxury City",
        metaTitle: "DOORA MOBILITY | Premium Car Rental",
        metaDescription: "Experience luxury with DOORA MOBILITY. Premium self-drive and chauffeur-driven vehicles.",
      },
    });
    console.log("✅ Business settings created.");
  }

  // 3. Clear existing vehicles (optional, for clean seed)
  await prisma.vehicleImage.deleteMany();
  await prisma.vehicle.deleteMany();

  // 4. Create Sample Luxury Vehicles
  const vehicles = [
    {
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      slug: "tesla-model-s-plaid",
      price: 25000,
      description: "Experience the future of driving with the Tesla Model S Plaid. Unmatched acceleration and premium comfort.",
      features: ["Autopilot", "Panoramic Roof", "Premium Audio", "Heated Seats"],
      seats: 5,
      transmission: "Automatic",
      fuel: "Electric",
      luggage: 2,
      featured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1617704548623-340376564e68?w=800&q=80", isPrimary: true },
          { url: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&q=80", isPrimary: false },
        ]
      }
    },
    {
      name: "Audi RS Q8",
      brand: "Audi",
      slug: "audi-rs-q8",
      price: 32000, 
      description: "The ultimate luxury SUV combining sports car performance with everyday usability.",
      features: ["Leather Interior", "All-Wheel Drive", "Massaging Seats", "Navigation"],
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      luggage: 4,
      featured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80", isPrimary: true },
        ]
      }
    },
    {
      name: "Porsche 911 Carrera",
      brand: "Porsche",
      slug: "porsche-911-carrera",
      price: 45000, 
      description: "Iconic sports car offering an exhilarating driving experience and timeless design.",
      features: ["Sport Chrono Package", "Bose Surround Sound", "Performance Exhaust"],
      seats: 2,
      transmission: "Automatic",
      fuel: "Petrol",
      luggage: 1,
      featured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1503376710915-18db0d32bb3f?w=800&q=80", isPrimary: true },
        ]
      }
    },
    {
      name: "Mercedes-Benz S-Class",
      brand: "Mercedes-Benz",
      slug: "mercedes-benz-s-class",
      price: 35000, 
      description: "The pinnacle of luxury and cutting-edge technology in a full-size sedan.",
      features: ["Burmester 3D Audio", "MBUX System", "Rear Seat Entertainment", "Air Suspension"],
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      luggage: 3,
      featured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", isPrimary: true },
        ]
      }
    },
    {
      name: "BMW 7 Series",
      brand: "BMW",
      slug: "bmw-7-series",
      price: 33000, 
      description: "Commanding presence combined with supreme ride comfort and innovative features.",
      features: ["Theater Screen", "Executive Lounge", "Bowers & Wilkins Audio", "xDrive"],
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      luggage: 3,
      featured: false,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", isPrimary: true },
        ]
      }
    },
    {
      name: "Range Rover Autobiography",
      brand: "Land Rover",
      slug: "range-rover-autobiography",
      price: 40000, 
      description: "Unparalleled off-road capability wrapped in an exquisitely crafted luxury interior.",
      features: ["Terrain Response", "Meridian Signature Sound", "Massage Seats", "Panoramic Roof"],
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      luggage: 4,
      featured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80", isPrimary: true },
        ]
      }
    },
    {
      name: "Bentley Continental GT",
      brand: "Bentley",
      slug: "bentley-continental-gt",
      price: 65000, 
      description: "The definitive grand tourer, blending thrilling performance with handcrafted luxury.",
      features: ["W12 Engine", "Naim Audio", "Rotating Display", "Quilted Leather"],
      seats: 4,
      transmission: "Automatic",
      fuel: "Petrol",
      luggage: 2,
      featured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1632249767855-3a054231b57e?w=800&q=80", isPrimary: true },
        ]
      }
    },
    {
      name: "Rolls-Royce Ghost",
      brand: "Rolls-Royce",
      slug: "rolls-royce-ghost",
      price: 85000, 
      description: "A sanctuary of tranquility and refined elegance on wheels.",
      features: ["Starlight Headliner", "Magic Carpet Ride", "Bespoke Audio", "V12 Engine"],
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      luggage: 3,
      featured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1631269389201-9a70f3f2f7ef?w=800&q=80", isPrimary: true },
        ]
      }
    },
    {
      name: "Lamborghini Urus",
      brand: "Lamborghini",
      slug: "lamborghini-urus",
      price: 70000, 
      description: "The world's first Super Sport Utility Vehicle, blending super sports car soul with SUV functionality.",
      features: ["ANIMA Selector", "Carbon Ceramic Brakes", "Alcantara Interior", "Bang & Olufsen Audio"],
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      luggage: 3,
      featured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1620882813898-750d4f3b8b1a?w=800&q=80", isPrimary: true },
        ]
      }
    },
    {
      name: "Ferrari Roma",
      brand: "Ferrari",
      slug: "ferrari-roma",
      price: 75000, 
      description: "Timeless elegance meets modern performance in this exquisite mid-front-engined V8 coupe.",
      features: ["V8 Turbo", "Carbon Fiber Steering Wheel", "Digital Cluster", "Passenger Display"],
      seats: 2,
      transmission: "Automatic",
      fuel: "Petrol",
      luggage: 1,
      featured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80", isPrimary: true },
        ]
      }
    }
  ];

  for (const v of vehicles) {
    await prisma.vehicle.create({
      data: v,
    });
  }
  
  console.log(`✅ Created ${vehicles.length} sample vehicles.`);
  console.log("Database seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
