import { faker } from "@faker-js/faker"
import { randomInt } from "crypto"

export const userData = {
    admin_name: "admin",
    admin_password: "Admin123",
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    postcode: faker.location.zipCode(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    card_number: faker.finance.creditCardNumber({ issuer: '#### #### #### ####' }),
    card_expiry:  randomInt(0o1, 12).toString().padStart(2, '0') + "/" + randomInt(26, 35).toString(),
    card_cvc: faker.finance.creditCardCVV(),
}
