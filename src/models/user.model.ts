
export interface IUser {
    name: string
    email: string
    password?: string
    favoriteHeadlinesIds: string[]
    notifications: {
        id: string
        text: string
        isUnread: boolean
        createdAt: number
        headLineId: string
    }[]
    lastSignInTime: number
    photoURL: string
}