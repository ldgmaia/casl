import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from './defineAbilityFor.js'
import { User } from './models/user.js'
import { Role } from './roles.js'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },

  MEMBER(_, { can }) {
    // can('invite', 'User')
    can('create', 'Project')
    can('transfer_ownership', 'Organization')
    can('delete', 'User')
  },
  BILLING() {},
}
