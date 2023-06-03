export interface Person {
    profile_path: string | null,
    birthday: string,
    deathday: null | string,
    id: number,
    name: string,
    biography: string,
    placeOfBirth: string,
    starredIn: any[] /* TODO: Create interface */
    workedOn: any[] /* TODO: Create interface */
}
