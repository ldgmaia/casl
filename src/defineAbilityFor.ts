import {
  AbilityBuilder,
  CreateAbility,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability'
import { User } from './models/user.js'
import { permissions } from './permissions.js'
import { ProjectSubject } from './subjects/project.js'
import { UserSubject } from './subjects/user.js'

type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build()

  return ability

  // can("invite", "User")
  // can("delete", "User")

  // export const ability = build()
}

// --------------- RULES goes above
