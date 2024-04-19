export class User {
    _id: string = ""
    firstname: string = ""
    lastname: string = ""
    age: number = 0
    role: 'SuperAdmin' | 'Admin' | 'Employee' = "Employee"
    department: 'IT' | 'HR' | 'Admin' = "IT"
    email: string = ""
    phone: number = 0
    isactive: boolean = true
}
export class Column {
    field: string = ""
    header: string = ""
    type: 'string' | 'number' | 'bool' | 'dropdown' = 'string'
}