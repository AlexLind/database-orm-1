const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
    },
    include: {
      contact: true,
    },
  });

  console.log("Customer created", createdCustomer);

  // Add your code here

  const createdContact = await prisma.contact.create({
    data: {
      phone: "12345678",
      email: "foo@bar.com",
      customer: {
        connect: { id: createdCustomer.id },
      },
    },
  });

  console.log("Contact created", createdContact);

  const createdMovie = await prisma.movie.create({
    data: {
      title: "Good Movie Title",
      runtimeMins: 96,
    },
  });

  console.log("Movie created", createdMovie);

  const createdScreen = await prisma.screen.create({
    data: {
      number: 1,
    },
  });

  console.log("Screen created", createdScreen);

  const createdScreening = await prisma.screening.create({
    data: {
      startsAt: new Date(628021800000),
      movie: {
        connect: { id: createdMovie.id },
      },
      screen: {
        connect: { id: createdScreen.id },
      },
    },
    include: {
      screen: true,
      movie: true,
    },
  });

  console.log("Screening created", createdScreening);

  const createdTicket = await prisma.ticket.createMany({
    data: [
      {
        customerId: createdCustomer.id,
        screeningId: createdScreening.id,
      },
      {
        customerId: createdCustomer.id,
        screeningId: createdScreening.id,
      },
    ],
  });

  console.log("Ticket created", createdTicket);

  //   const createdTicket2 = await prisma.ticket.create({
  //     data: {
  //       customer: {
  //         connect: { id: createdCustomer.id },
  //       },
  //       screening: {
  //         connect: { id: createdScreening.id },
  //       },
  //     },
  //   });

  //   console.log("Ticket2 created", createdTicket2);

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
