using EmployeeModel;

public class EmployeesController : ApiController {
  public ActionResult getEmployees() {
    PaylocityDBContext dbContext = new PaylocityDBContext();
    EmployeeModel data = dbContext.retrieveEmployeesFromDB()
  }
}
