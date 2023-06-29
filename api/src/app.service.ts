import {Injectable} from '@nestjs/common';
import {UsersService} from "./modules/users/service/users/users.service";
import {UserPetsService} from "./modules/users/service/user-pets/user-pets.service";
import {UserProfilesService} from "./modules/users/service/user-profiles/user-profiles.service";
import {User} from "./typeorm/entities/User";
import {Role} from "./constants/Role";
import {CreateUserDto} from "./modules/users/dtos/User.dto";
import {faker} from "@faker-js/faker";
import {Gender} from "./constants/Gender";
import {UploaderService} from "./modules/uploader/service/uploader/uploader.service";

@Injectable()
export class AppService {

  constructor(
      private usersService: UsersService,
      private userPetsService: UserPetsService,
      private userProfilesService: UserProfilesService,
      private uploaderService: UploaderService,
  ) {
  }
  seedDatabase() {
    const genders = Object.keys(Gender)
    const fakeUsers: CreateUserDto[] = Object.keys(Role).map(role => ({
      email: role.toLowerCase() + '@catchparty.eu',
      password: role.toLowerCase() + '1234',
      confirmPassword: role.toLowerCase() + '1234',
      role,
    } as CreateUserDto))

    fakeUsers.forEach(async (user, userIndex) => {
      const createdUser: User = await this.usersService.create(user)

      // Create Profiles
      for (let profileIndex = 0; profileIndex < userIndex + 1; profileIndex++) {
        await this.userProfilesService.create({
          firstName: faker.person.firstName((genders[profileIndex] ?? Gender.MALE).toLowerCase() as any),
          lastName: faker.person.lastName((genders[profileIndex] ?? Gender.MALE).toLowerCase() as any),
          nickname: faker.internet.displayName(),
          gender: genders[profileIndex] as Gender ?? Gender.OTHER,
          description: faker.lorem.text(),
          isPrimary: profileIndex === 0,
          birthDate: new Date(),
          websiteUrl: faker.image.urlPlaceholder(),
          youtubeUrl: faker.image.urlPlaceholder(),
          user: createdUser.id,
        })
      }
      // Create Pet
      for (let petIndex = 0; petIndex < userIndex + 1; petIndex++) {
        await this.userPetsService.create({
          name: faker.person.firstName((genders[petIndex] ?? Gender.MALE).toLowerCase() as any),
          passportNumber: faker.string.uuid(),
          breed: faker.animal.dog(),
          color: faker.vehicle.color(),
          description: faker.lorem.text(),
          personality: faker.person.bio(),
          birthDate: new Date(),
          weight: Math.round(Math.random() * 20),
          breeding: faker.company.name(),
          gender: genders[petIndex] as Gender ?? Gender.OTHER,
          facebookUrl: faker.image.urlPlaceholder(),
          instagramUrl: faker.image.urlPlaceholder(),
          user: createdUser.id,
        })
      }
    })
  }

  async dropDatabase() {
    await this.uploaderService.dropDatabaseTable()
    await this.userPetsService.dropDatabaseTable()
    await this.userProfilesService.dropDatabaseTable()
    await this.usersService.dropDatabaseTable()
  }
}
