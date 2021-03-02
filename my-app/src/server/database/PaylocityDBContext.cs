using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;

public class PaylocityDBContext {
  PaylocityDBContext() {
    Database.start()
  }

  public EmployeeModel retrieveEmployeesFromDB() {
    SqlParameter[] parameters = EmployeeModel.BuildParametersForEmployee();
    Database.ExecuteSqlCommand("EXEC dbo.GetEmployeesList", parameters);
    var employeeList = EmployeeModel.PopulateEmployeeListObject(parameters);
  }
}
