// 1. Create an employee record
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // 2. Create multiple employee records
  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employeeArray => createEmployeeRecord(employeeArray));
  }
  
  // 3. Create a time-in event for an employee
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }
  
  // 4. Create a time-out event for an employee
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }
  
  // 5. Calculate the hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // 6. Calculate the wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // 7. Calculate all wages earned for an employee
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
      const date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  }
  
  // 8. Calculate the total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
      return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
  }
  
  // Example usage:
  const employeesData = [
    ["Gray", "Worm", "Scourge", 1],
    ["Jon", "Snow", "Lord Commander", 1]
  ];
  
  // Create employee records
  const employees = createEmployeeRecords(employeesData);
  
  // Add time-in and time-out events
  createTimeInEvent(employees[0], "2018-01-01 0900");
  createTimeOutEvent(employees[0], "2018-01-01 1700");
  createTimeInEvent(employees[1], "2018-01-01 0800");
  createTimeOutEvent(employees[1], "2018-01-01 1600");
  
  // Calculate and log wages for each employee
  console.log(wagesEarnedOnDate(employees[0], "2018-01-01")); // 8
  console.log(wagesEarnedOnDate(employees[1], "2018-01-01")); // 8
  
  // Calculate and log total payroll
  console.log(calculatePayroll(employees)); // 16
  
