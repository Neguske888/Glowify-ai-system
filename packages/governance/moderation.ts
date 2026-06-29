export interface ModerationPolicy {
  readonly moderationPolicyId: string
  readonly allowGeneratedContent?: boolean
  readonly reviewRequired?: boolean
  readonly blockedCategories?: readonly string[]
}
