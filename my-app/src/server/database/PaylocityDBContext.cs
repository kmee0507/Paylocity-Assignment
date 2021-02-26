public class PaylocityDBContext {
  PaylocityDBContext() {
    Database.start()
  }

  public EmployeeModel retrieveEmployeesFromDB() {
    SQLParameter[] parameters = EmployeeModel.BuildParametersForEmployee();
    Database.ExecuteSqlCommand("EXEC dbo.GetEmployeesList", parameters);
    var employeeList = EmployeeModel.PopulateEmployeeListObject(parameters);
  }
}
