export interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    imageUrl?: any;
}

export interface Connections {
    id: number;
    connectionId: string;
    user1: User;
    user2: User;
    created_at: Date;
}
