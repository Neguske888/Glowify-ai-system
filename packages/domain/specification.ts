export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean | Promise<boolean>
  and(other: Specification<T>): Specification<T>
  or(other: Specification<T>): Specification<T>
  not(): Specification<T>
}
