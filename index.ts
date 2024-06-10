import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Person {
  students: Student[] = [];
  addStudent(obj: Student) {
    this.students.push(obj);
  }
}

const persons = new Person();

const programStart = async (persons: Person) => {
  let continueProgram = true;

  do {
    console.log(chalk.blue`Welcome Guest`);

    const firstQuestion = await inquirer.prompt([
      {
        type: "list",
        name: "select",
        message: chalk.blue`Who would you like to talk to?`,
        choices: ["student", "staff", "Exit"]
      },
    ]);

    if (firstQuestion.select === "staff") {
      console.log(chalk.green("Go to the staff room and talk to the staff"));
    } else if (firstQuestion.select === "student") {
      const studentName = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: chalk.greenBright`Which student do you want to talk to?`,
        },
      ]);
      const existingStudent = persons.students.find((student) => student.name === studentName.name);
      if (!existingStudent) {
        const newStudent = new Student(studentName.name);
        persons.addStudent(newStudent);
        console.log(chalk.green(`Hello, I am ${newStudent.name}. Nice to meet you.`));
        console.log(chalk.green("New student added."));
        console.log(chalk.green("Current student list:"));
        console.log(persons.students);
      } else {
        console.log(chalk.greenBright`Hello, I am ${existingStudent.name}. Nice to see you again.`);
        console.log(chalk.bold.blue`Existing Student list:`);
        console.log(persons.students);
      }
    } else if (firstQuestion.select === "Exit") {
      console.log(chalk.red("Goodbye!"));
    }
    const { confirmExit } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmExit",
        message : chalk.blue`Funther check your Transaction ?`,
        default: true,
      }
    ]);
    continueProgram = confirmExit;
  } while (continueProgram);
};

programStart(persons);
