const person = {
  name: 'Hero Alom',
  age: 34,
  phone: '039945924',
  address: 'bari nai',
  p: [1, 2, 3, 4],
};

const { name: myName, age, address, p: numbers } = person;
console.log(myName, age);
console.log(numbers);

for (let number of numbers) {
  console.log(number);
}
