const availableClassDates = {
    "Beginner Yoga": [
        "2025-06-02", "2025-06-09", "2025-06-16", "2025-06-23", "2025-06-30",
        "2025-07-07", "2025-07-14", "2025-07-21", "2025-07-28",
        "2025-08-04", "2025-08-11", "2025-08-18", "2025-08-25"
      ],
      "Intermediate Yoga": [
        "2025-06-03", "2025-06-10", "2025-06-17", "2025-06-24", "2025-07-01",
        "2025-07-08", "2025-07-15", "2025-07-22", "2025-07-29",
        "2025-08-05", "2025-08-12", "2025-08-19", "2025-08-26"
      ],
      "Advanced Yoga": [
        "2025-06-04", "2025-06-11", "2025-06-18", "2025-06-25", "2025-07-02",
        "2025-07-09", "2025-07-16", "2025-07-23", "2025-07-30",
        "2025-08-06", "2025-08-13", "2025-08-20", "2025-08-27"
      ],
      "Meditation": [
        "2025-06-05", "2025-06-12", "2025-06-19", "2025-06-26", "2025-07-03",
        "2025-07-10", "2025-07-17", "2025-07-24", "2025-07-31",
        "2025-08-07", "2025-08-14", "2025-08-21", "2025-08-28"
      ],
      "Gentle Yoga": [
        "2025-06-06", "2025-06-13", "2025-06-20", "2025-06-27", "2025-07-04",
        "2025-07-11", "2025-07-18", "2025-07-25", "2025-08-01",
        "2025-08-08", "2025-08-15", "2025-08-22", "2025-08-29"
      ],
      "Chair Yoga": [
        "2025-06-02", "2025-06-09", "2025-06-16", "2025-06-23", "2025-06-30",
        "2025-07-07", "2025-07-14", "2025-07-21", "2025-07-28",
        "2025-08-04", "2025-08-11", "2025-08-18", "2025-08-25"
      ],
      "Kids and Teens Yoga": [
        "2025-06-03", "2025-06-10", "2025-06-17", "2025-06-24", "2025-07-01",
        "2025-07-08", "2025-07-15", "2025-07-22", "2025-07-29",
        "2025-08-05", "2025-08-12", "2025-08-19", "2025-08-26"
      ]
    };    
 

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");


let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();


const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

                const renderCalendar = () => {
                let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
                    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
                    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
                    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
              
                let liTag = "";
              
                for (let i = firstDayofMonth; i > 0; i--) {
                  liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
                }
              
                for (let i = 1; i <= lastDateofMonth; i++) {
                  const isToday = i === new Date().getDate() &&
                                  currMonth === new Date().getMonth() &&
                                  currYear === new Date().getFullYear()
                                  ? "active" : "";
              
                  const day = i.toString().padStart(2, '0');
                  const month = (currMonth + 1).toString().padStart(2, '0');
                  const fullDate = `${currYear}-${month}-${day}`;
              
                  let classTypeClass = "";
                  for (const [classType, dates] of Object.entries(availableClassDates)) {
                    if (dates.includes(fullDate)) {
                      classTypeClass = "class-available " + classType.toLowerCase().replace(/[\s&]+/g, '-');
                      break;
                    }
                  }
              
                  liTag += `<li class="${isToday} ${classTypeClass}">${i}</li>`;
                }
              
                for (let i = lastDayofMonth; i < 6; i++) {
                  liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
                }
              
                currentDate.innerText = `${months[currMonth]} ${currYear}`;
                daysTag.innerHTML = liTag;
              };

              renderCalendar();
              
              prevNextIcon.forEach(icon => {
                icon.addEventListener("click", () => {
                  currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
              
                  if (currMonth < 0) {
                    currMonth = 11;
                    currYear--;
                  } else if (currMonth > 11) {
                    currMonth = 0;
                    currYear++;
                  }
              
                  renderCalendar();
                });
              });
              