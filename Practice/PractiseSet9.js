let DATA = "this is data";
class person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  viwedata() {
    console.log("data", DATA);
  }
}
class Admin extends person {
  constructor(name, email) {
    super(name, email);
  }
  editData() {
    console.log("secrete data");
  }
}

let newuser = new person("Arjun", "arjun@123gmail.com");
let Admin1 = new Admin("a", "k@")

