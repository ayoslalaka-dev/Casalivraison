module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("event_info", [
      {
        name: "La Grande Soirée Gnawa",
        date: "15–16 Juin 2025",
        location: "Essaouira, Maroc",
        description:
          "Plongez dans l'univers mystique des Maâlems. Une soirée de transe, spiritualité et fusion musicale.",
        banner_url: "https://example.com/banner.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("artists", [
      {
        name: "Hamid El Kasri",
        genre: "Gnawa",
        bio: "Maâlem emblématique de la tradition Gnawa, gardien de la mémoire musicale ancestrale.",
        schedule_time: "Samedi 20:00",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Hamid_El_Kasri_2015.jpg/440px-Hamid_El_Kasri_2015.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mustapha Baqbou",
        genre: "Gnawa",
        bio: "Maâlem renommé pour ses performances hypnotiques et sa maîtrise du guembri.",
        schedule_time: "Dimanche 21:00",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Maalem_Mustapha_Bakbou.jpg/440px-Maalem_Mustapha_Bakbou.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tinariwen",
        genre: "Desert Blues / Gnawa Fusion",
        bio: "Groupe légendaire du désert saharien, fusionnant blues touareg et sonorités africaines.",
        schedule_time: "Dimanche 22:30",
        image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Tinariwen_mg_6915.jpg/440px-Tinariwen_mg_6915.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("bookings", null, {});
    await queryInterface.bulkDelete("artists", null, {});
    await queryInterface.bulkDelete("event_info", null, {});
  },
};

