import {
  AbilityBuilder,
  CreateAbility,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability'
import { z } from 'zod'
import { User } from './models/user.js'
import { permissions } from './permissions.js'
import { billingSubject } from './subjects/billing.js'
import { inviteSubject } from './subjects/invite.js'
import { organizationSubject } from './subjects/organization.js'
import { projectSubject } from './subjects/project.js'
import { userSubject } from './subjects/user.js'

const appAbilitiesSchema = z.union([
  billingSubject,
  inviteSubject,
  organizationSubject,
  projectSubject,
  userSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

// type AppAbilities =
//   | BillingSubject
//   | InviteSubject
//   | OrganizationSubject
//   | ProjectSubject
//   | UserSubject
//   | ['manage', 'all']

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
