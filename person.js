module.exports = class Person {
  constructor(name,location) {
    this.name = name;
    this.playerLocation = location;
    this.playerCompletedLap = 0;
  }

  display() {
         // console.log("Person Name: "+this.name);
  }
}
