import { defineAbilityFor } from './defineAbilityFor.js'
import { projectSchema } from './models/project.js'

const ability = defineAbilityFor({
  role: ['MEMBER', 'BILLING'],
  id: 'user-id',
  __typename: 'User',
})

const project = projectSchema.parse({
  id: 'project-id',
  ownerId: 'user2-id',
  // __typename: 'Project',
})

console.log(ability.can('transfer_ownership', 'Organization'))
console.log(ability.can('delete', 'User'))
console.log(ability.can('delete', project))
console.log(ability.can('manage', 'Billing'))
