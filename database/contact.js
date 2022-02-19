const fs = require('fs')

function loadContacts() {
  const contacts = JSON.parse(
    fs.readFileSync(__dirname + '/db-contact.json', 'utf-8')
  )
  return contacts
}

function filterContact(id) {
  const contacts = loadContacts()
  const contact = contacts.find((x) => x['id'] === id)
  return contact
}
function loadOneContact(id) {
  const filteredContact = filterContact(id)
  return filteredContact
}
function addNewContact(newContact) {
  const { name, number, email } = newContact
  if (name && number && email) {
    const contacts = loadContacts()
    const { length } = contacts
    if (length) {
      newContact.id = contacts[length - 1].id + 1
    } else {
      newContact.id = 1
    }
    contacts.push(newContact)
    fs.writeFileSync(
      __dirname + '/db-contact.json',
      JSON.stringify(contacts, null, '\t')
    )
    return { status: 'oke' }
  } else {
    return { status: 'failed', data: newContact, message: 'wrong field data' }
  }
}

function editContact(editedContact) {
  const contacts = loadContacts()
  const indexId = contacts.findIndex((x) => x['id'] === editedContact.id)
  if (contacts[indexId]?.id) {
    contacts[indexId] = editedContact
    fs.writeFileSync(
      __dirname + '/db-contact.json',
      JSON.stringify(contacts, null, '\t')
    )
    return { status: 'ok' }
  } else {
    return { status: `contact dengan id ${editedContact.id} tidak di temukan` }
  }
}
function deleteContact(contactId) {
  const contacts = loadContacts()
  const filter = contacts.filter((x) => x['id'] !== parseInt(contactId))
  fs.writeFileSync(
    __dirname + '/db-contact.json',
    JSON.stringify(filter, null, '\t')
  )
  if (contacts.length !== filter.length) {
    return { status: 'ok', message: `contact succesfully deleted` }
  } else {
    return { status: 'failed', message: `wrong id: ${contactId}` }
  }
}

module.exports = {
  loadContacts,
  loadOneContact,
  addNewContact,
  editContact,
  deleteContact,
}
