using server-models/EmployeeModel;
using System.Web.Mvc;

public class EmployeesController : ApiController {
  public ActionResult getEmployees() {
    PaylocityDBContext dbContext = new PaylocityDBContext();
    EmployeeModel data = dbContext.retrieveEmployeesFromDB();
    return Json(data, JsonRequestBehavior.AllowGet);
  }
}
