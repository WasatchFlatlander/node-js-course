const square = x => x*x;

console.log(square(9));


const user = {
  name: 'Josh',
  sayHi: () => {console.log(`Hi`)},
  sayHiAlt(){
    console.log(arguments)
    console.log(`${this.name} is my name.`);
  }
};
user.sayHiAlt(1,2,3);
