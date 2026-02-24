const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'casalivraison',
    password: 'postgres',
    port: 5432
});

async function seed() {
    try {
        await client.connect();
        console.log('Connected to DB');

        // Clean
        await client.query('DELETE FROM "Restaurants"');
        await client.query('DELETE FROM "Categories"');

        // Insert Category
        const catRes = await client.query(
            'INSERT INTO "Categories" (name, "createdAt", "updatedAt") VALUES ($1, NOW(), NOW()) RETURNING id',
            ['Gastronomie']
        );
        const catId = catRes.rows[0].id;
        console.log('Inserted Category ID:', catId);

        // Insert Restaurant
        await client.query(
            'INSERT INTO "Restaurants" (name, address, phone, "imageUrl", rating, "deliveryTime", "categoryId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())',
            ['L Artiste du Goût', 'Anfa, Casablanca', '0522-123456', 'https://images.unsplash.com/photo-1544148103-0773bf10d330', 4.8, '25-35 min', catId]
        );
        console.log('Inserted Restaurant');

    } catch (err) {
        console.error('Seed error:', err);
    } finally {
        await client.end();
    }
}

seed();
