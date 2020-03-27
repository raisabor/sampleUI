export class Child {
    constructor(id, name, parentName, age, phoneNumber,height) {
        this.id = id;
        this.name = name;
        this.parentName = parentName;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.height = height;
        // These will need to be transferred from global state when constructor is called
    }
}
export default Child;