const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      oneContact = await contacts.getContactById(id);
      if (!oneContact) {
        console.log(`Contact with id ${id} not found!`);
      } else {
        console.log(oneContact);
      }
      break;

    case "add":
      const addContact = await contacts.add({ name, email, phone });
      return console.log("Add contacvt: ", addContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
