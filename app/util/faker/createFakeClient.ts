const faker = require('faker');


function createFakeClient(){

    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number({ min: 18, max: 101 }),
        email: faker.internet.email(),
    }

}


export default createFakeClient