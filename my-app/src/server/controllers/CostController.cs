using System.Web.Mvc;

public class CostController {
  public ActionResult getCost() {
    PaylocityDBContext dbContext = new PaylocityDBContext();
    // save employees and calculate cost or only run cost on front end
    // decision to be made
    return Json(0, JsonRequestBehavior.AllowGet);
  }
}
