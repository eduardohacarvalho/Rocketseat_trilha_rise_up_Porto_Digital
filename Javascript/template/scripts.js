const guests = document.querySelector("ul")

const newGuest = document.createElement("li")
newGuest.classList
const guestName = document.createElement("span")

guestName.textContent = "Diego"

const guestSurname = document.createElement("span")
guestSurname.textContent = "Farias"



newGuest.append(guestName)
newGuest.prepend(guestSurname)

guests.append(newGuest)