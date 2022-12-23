import PersonForm from './components/personForm.js';
import Filter from './components/filter.js';
import Persons from './components/persons.js';
import axios from 'axios';
import { useState, useEffect } from 'react'

const App = () => {

  //Set the useState variables here
  let [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('');
  const [namesOutput, search] = useState([]);
  const [autoRender, thisRender] = useState('false')

  //This variable is to check if there are any duplicates or not
  let duplicates = 0;

  //axios.get("http://localhost:3001/persons").then(response => setPersons(response.data))

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/persons")
      .then(response => {
        console.log(response.data);
        setPersons(response.data)
      })
      .catch(err => console.log(err))
  }, []);


  //event handler for onSubmit for form element
  const addPerson = (event) => {
    event.preventDefault();
    persons.forEach((person) => {
      //check if there are duplicates
      if (person.name === newName) {
        alert(`${newName} already in phonebook`);
        duplicates += 1;
      }
      else if (person.number === newNum) {
        alert("This number already exists");
        duplicates += 1;
      }
    });

    //check if there are no duplicates
    if (duplicates === 0) {
      const newPersonObj =
      {
        name: newName,
        number: newNum
      };
      axios.post('http://localhost:3001/api/persons', newPersonObj)
        .then(res => console.log(res))
      setPersons(persons.concat(newPersonObj));
      window.location.reload(false);
    }
  }

  //onChange function for name: input element
  const setNewNames = (event) => {
    //This command explicitly checks the INPUT's 
    //value(the thing that's typed in), not the value
    //that it's equal to!(in this case its newName);
    setNewName(event.target.value);
  }

  //onChange function for number: input element
  const setNewNumber = (event) => {
    setNewNum(event.target.value);
  }


  //onChange function for search: input element
  const searchForName = (event) => {
    const currentNameSearch = event.target.value;
    const filteredArray = persons.filter((person) => {
      return person.name.toLowerCase().includes(currentNameSearch);
    });

    if (currentNameSearch.trim().length !== 0) {
      search(filteredArray);
    }
    else {
      search([]);
    }
  }

  const deleteFunc = (event) => {

    event.preventDefault();
    console.log(event.target.id)
    persons = persons.filter((person) => { person.id != event.target.id; })
    setPersons(persons);
    axios.delete(`http://localhost:3001/api/persons/${event.target.id}`)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchForName} namesOutputArray={namesOutput} />

      <h2>Add A New Contact</h2>
      <PersonForm addPersonFunction={addPerson} newNameProp={newName} setNewNamesFunction={setNewNames}
        newNumProp={newNum} setNewNumberFunction={setNewNumber} />

      <h2>Numbers</h2>
      <Persons personsArray={persons} personsDelete={deleteFunc} />
    </div>
  )
}

export default App












