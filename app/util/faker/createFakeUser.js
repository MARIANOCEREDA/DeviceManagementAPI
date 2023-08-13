const faker = require('faker');

const fakeUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    phoneNumber: faker.phone.phoneNumber(),
    state: faker.address.state(),
    city: faker.address.city(),
    country: faker.address.country(),
    password: faker.internet.password(),
    age: faker.datatype.number({ min: 18, max: 65 }),
    email: faker.internet.email(),
}

console.log(JSON.stringify(fakeUser))