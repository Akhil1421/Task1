interface User {
    id: String,
    logged_in: Date,
    logged_out: Date,
    lastSeenAt: Date
}

function calculateMontlyUsers(users: User[]): User[] {
    let current_date: Date = new Date()
    return users.filter((user) => {
        let condition1: boolean = user.logged_in.getFullYear() === current_date.getFullYear() && user.logged_in.getMonth() === current_date.getMonth()
        let condition2: boolean = user.lastSeenAt.getFullYear() === current_date.getFullYear() && user.lastSeenAt.getMonth() === current_date.getMonth()
        return condition1 || condition2
    })
}

function is_active(date: Date, days: number) : boolean{
    const currentDate = new Date();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffInMilliseconds = currentDate.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / millisecondsPerDay);
    return diffInDays <= days;
}

function calculateActiveUsers(users: User[]): User[]{
    return users.filter((user) => {        
        return is_active(user.lastSeenAt, 30)
    })   
}

const users: User[] = [
    {
        id: "user1",
        logged_in: new Date("2024-02-01"),
        logged_out: new Date("2024-02-05"),
        lastSeenAt: new Date("2024-02-05")
    },
    {
        id: "user2",
        logged_in: new Date("2024-03-05"),
        lastSeenAt: new Date("2024-03-07"),
        logged_out: new Date("2024-03-04"),
    },
    {
        id: "user3",
        logged_in: new Date("2024-02-15"),
        lastSeenAt: new Date("2024-03-20"),
        logged_out: new Date("2024-03-04"),
    }
    // Add more user objects as needed for testing
];


//these filters can be done on mongoDB db as following queries
// import { Document, Schema, model, Model } from 'mongoose';

// interface User extends Document {
//     id: string;
//     logged_in: Date;
//     logged_out: Date;
//     lastSeenAt: Date;
// }

// const UserSchema = new Schema<User>({
//     id: String,
//     logged_in: Date,
//     logged_out: Date,
//     lastSeenAt: Date
// });

// const UserModel: Model<User> = model<User>('User', UserSchema);

// async function calculateMonthlyUsers(): Promise<User[]> {
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     return await UserModel.find({
//         $or: [
//             { logged_in: { $gte: new Date(year, month, 1), $lt: new Date(year, month + 1, 0) } },
//             { lastSeenAt: { $gte: new Date(year, month, 1), $lt: new Date(year, month + 1, 0) } }
//         ]
//     }).exec();
// }

// async function calculateActiveUsers(): Promise<User[]> {
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
//     return await UserModel.find({ lastSeenAt: { $gte: thirtyDaysAgo } }).exec();
// }
