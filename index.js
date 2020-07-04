//This will be a menu for an animal shelter

//Here is the class for the pets being logged into the system:
class Pet {
    constructor(name, breed, age, sex) {
        this.name = name;
        this.breed = breed;
        this.age = age
        this.sex = sex
    }

    describe() {
        return `${name} is a ${sex} ${breed}, and is ${age} year olds`
    }
}

//Here is the class for the spieces of animal:
class Species {
    constructor(name) {
        this.name = name;
        this.pets = [];
    }

    addPet(pet) {
        if (pet instanceof Pet) {
            this.pets.push(pet);
        } else {
            throw new Error(`You can only add an instance of Pet. Argument is not a pet: ${pet}`);
        }
    }

    describe() {
        return `${this.animalSpecies} has ${this.pets.length} pets`;
    }
}

//This class creates the menu for the animal shelter:
class Menu {
    constructor() {
        this.animalSpecies = [];
        this.selectedSpecies = null;
    }

// createData pushes some examples into the the menu
    createData() {
        this.animalSpecies.push(new Species('dogs'));
        this.animalSpecies.push(new Species('cats'));
        this.animalSpecies[0].pets.push(new Pet('Snoopy', 'beagle', 5, 'male'));
        this.animalSpecies[1].pets.push(new Pet('Garfield', 'orange tabby', '8 months', 'male'));
    }

//stars the main menu:
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.viewAnimals();
                    break;
                case '2':
                    this.surrenderAnimal();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }


//shows various menu options:
    showMainMenuOptions() {
        return prompt(`
        Welcome to the Virtual Animal Shelter!
        -------------------------------------------
            0) exit
            1) view avaliable pets
            2) surrender an animal
        `);
    }

//from surrenderAnimal():
    showSurrendersMenuOptions(info) {
        return prompt(`
        0) back
        1) surrender a new species of pet
        2) surrender a pet in an existing field
        -----------------------------
        ${info}
        `);
    }

//from viewAnimals():
    showAdoptionMenuOptions(description) {
        return prompt(`
        0) back
        1) Adopt pet
        ----------------------------
        ${description}
        `);
    }


//viewAnimals shows the user species index while thy are prompted to choose the index they want to view
//then it shows them the list of animals with their indexes, with the option to 'adopt' an animal they are viewing or return to the previous menu
    viewAnimals() {
        let speciesString = '';
        for (let i =0; i < this.animalSpecies.length; i++) {
            speciesString += i + ') ' + this.animalSpecies[i].name + '\n';
        }
        let index = prompt(`${speciesString}` + '\n' +
        '----------------------------------------' + '\n' +
        'Enter the index of the species you would like to view:');

        if (index > -1 && index < this.animalSpecies.length) {
            this.selectedSpecies = this.animalSpecies[index];
            let description = 'Viewing: ' + this.selectedSpecies.name + '\n';
            let currentIndex = index
            
            for (let i = 0; i < this.selectedSpecies.pets.length; i++) {
                description += i + ') ' + this.selectedSpecies.pets[i].name 
                + ' - ' + this.selectedSpecies.pets[i].breed
                + ' - ' + this.selectedSpecies.pets[i].sex
                + ' - age: ' + this.selectedSpecies.pets[i].age + '\n';
            }
            let selection = this.showAdoptionMenuOptions(description);
            switch (selection) {
                case '1':
                    this.adoptPet(currentIndex);
                    break;
            }
        }
    }

//surrenderAnimal shows to user the species index while they are prompted to choose between creating a new species or a new list
    surrenderAnimal() {
        let speciesString = '';
        for (let i =0; i < this.animalSpecies.length; i++) {
            speciesString += i + ') ' + this.animalSpecies[i].name + '\n';
        }
        let info = 'species index: ' + '\n' + `${speciesString}`;

        let selection = this.showSurrendersMenuOptions(info);
        switch (selection) {
            case '1':
                this.addSpecies();
                break;
            case '2':
                this.surrenderPet();
                break;
        }
    }

//addSpecies adds a new Species class to the array and then prompts for a new pet to be added to it
    addSpecies() {
        let name = prompt('Enter name for the new species listing:');
        this.animalSpecies.push(new Species(name));
        let petName = prompt('What is the name of the animal?')
        let breed = prompt('What is the breed of the animal?')
        let age = prompt('What is the animals age in years?')
        let sex = prompt('Is the animal male or female?')
        this.animalSpecies[this.animalSpecies.length - 1].pets.push(new Pet(petName, breed, age, sex));
    }

//surrenderPet adds a pet to the selected species
    surrenderPet() {
        let speciesString = '';
        for (let i =0; i < this.animalSpecies.length; i++) {
            speciesString += i + ') ' + this.animalSpecies[i].name + '\n';
        }
        let index = prompt(`${speciesString}` + '\n' + 'Please enter the species index of the pet you wish to surrender:');
        if (index > -1 && index < this.animalSpecies.length) {
            let name = prompt('What is the name of the animal?')
            let breed = prompt('What is the breed of the animal?')
            let age = prompt('What is the animals age')
            let sex = prompt('Is the animal male or female?')
            this.animalSpecies[index].pets.push(new Pet(name, breed, age, sex));
        }   
    }

//adoptPet removes a pet from the selected species
    adoptPet(currentSpecies) {
        let index = prompt('Enter the index of the pet you want to adopt:');
        if (index > -1 && index < this.selectedSpecies.pets.length) {
            this.selectedSpecies.pets.splice(index, 1);
        }
        if (this.selectedSpecies.pets.length < 1){
            this.animalSpecies.splice(currentSpecies, 1);
        }
    }
}

let menu = new Menu();
menu.createData();
menu.start();

