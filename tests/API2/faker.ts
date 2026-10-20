
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

console.log(faker.person.firstName())
console.log(faker.person.lastName())
console.log(faker.person.gender())
console.log(faker.person.jobTitle())


console.log(faker.internet.email())
console.log(faker.internet.email())
console.log(faker.internet.password());


console.log(DateTime.now());