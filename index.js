const { program } = require('commander');
const contacts = require('./contacts');

program
  .option('-a,--action <type>', 'choose action')
  .option('-i,--id <type>', 'user id')
  .option('-n,--name <type>', 'user name')
  .option('-e,--email <type>', 'user email')
  .option('-p,--phone <type>', 'user phone');

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case 'get':
      const getContact = await contacts.getContactById(id);
      return console.log(getContact);

    case 'remove':
      const removeItem = await contacts.removeContact(id);
      return console.log(removeItem);

    case 'add':
      const addItem = await contacts.addContact(name, email, phone);
      return console.log(addItem);
    default:
      return console.log('Unknown action');
  }
};
invokeAction(options);
