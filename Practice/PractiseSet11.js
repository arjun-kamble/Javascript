let DATA = "this is data";
class clg {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  viewData() {
    Console.log("this is data");
  }
};
class Admin extends clg {
  editData() {
    console.log("edit data=", DATA);
  }
}
let student1 = new clg("arjun", "arjun@123");
let Admin1 = new clg("radha", "radha@123");