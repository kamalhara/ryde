import { neon } from "@neondatabase/serverless";

// POST endpoint to seed drivers data
export async function POST() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    // Seed drivers data
    const drivers = [
      {
        id: 1,
        first_name: "James",
        last_name: "Wilson",
        profile_image_url:
          "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
        car_image_url:
          "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
        car_seats: 4,
        rating: 4.8,
        price: 19.99,
        time: 8,
        car_type: "Premium",
        car_model: "Mercedes E-Class",
      },
      {
        id: 2,
        first_name: "David",
        last_name: "Brown",
        profile_image_url:
          "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
        car_image_url:
          "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
        car_seats: 5,
        rating: 4.6,
        price: 15.5,
        time: 12,
        car_type: "Comfort",
        car_model: "Toyota Camry",
      },
      {
        id: 3,
        first_name: "Michael",
        last_name: "Johnson",
        profile_image_url:
          "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
        car_image_url:
          "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
        car_seats: 4,
        rating: 4.7,
        price: 22.75,
        time: 5,
        car_type: "Premium",
        car_model: "BMW 5 Series",
      },
      {
        id: 4,
        first_name: "Robert",
        last_name: "Green",
        profile_image_url:
          "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
        car_image_url:
          "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
        car_seats: 4,
        rating: 4.9,
        price: 28.0,
        time: 3,
        car_type: "Luxury",
        car_model: "Audi A8",
      },
    ];

    // Insert each driver
    for (const driver of drivers) {
      await sql`
        INSERT INTO drivers (id, first_name, last_name, profile_image_url, car_image_url, car_seats, rating, price, time, car_type, car_model)
        VALUES (${driver.id}, ${driver.first_name}, ${driver.last_name}, ${driver.profile_image_url}, ${driver.car_image_url}, ${driver.car_seats}, ${driver.rating}, ${driver.price}, ${driver.time}, ${driver.car_type}, ${driver.car_model})
        ON CONFLICT (id) DO UPDATE SET
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          profile_image_url = EXCLUDED.profile_image_url,
          car_image_url = EXCLUDED.car_image_url,
          car_seats = EXCLUDED.car_seats,
          rating = EXCLUDED.rating,
          price = EXCLUDED.price,
          time = EXCLUDED.time,
          car_type = EXCLUDED.car_type,
          car_model = EXCLUDED.car_model
      `;
    }

    return Response.json({
      message: "Drivers seeded successfully",
      count: drivers.length,
    });
  } catch (error) {
    console.error("Error seeding drivers:", error);
    return Response.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
