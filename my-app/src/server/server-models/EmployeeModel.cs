using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;

using DependentModel;

public class EmployeeModel : PersonModel {
  public bool startsWithA;

  public static void BuildParametersForEmployee() {
    SqlParameter[] parameters = new SqlParameter[]
    {
      new SqlParameter("@FirstName", SqlDbType.VarChar, 255)
      {
        Direction = ParameterDirection.Output;
      }
      new SqlParameter("@LastName", SqlDbType.VarChar, 255)
      {
        Direction = ParameterDirection.Output;
      }
      new SqlParameter("@StartsWithA", SqlDbType.VarChar, 1)
      {
        Direction = ParameterDirection.Output;
      }
    }
  }

  public static EmployeeModel PopulateEmployeeListObject(SQLParameter[] parameters)
  {
    try
    {
        if(parameters == null)
        {
          return new EmployeeModel{};
        }

        EmployeeModel employee = new EmployeeModel
        {
          firstName = parameters.FirstOrDefault(parameter => parameter.ParameterName == "@FirstName").Value.ToString().Trim(),
          lastName = parameters.FirstOrDefault(parameter => parameter.ParameterName == "@LastName").Value.ToString().Trim(),
          startsWithA = parameters.FirstOrDefault(parameter => parameter.ParameterName == "@StartsWithA").Value.ToString().Trim().ToLower() == "y"
        }

        return employee;
    }
    catch (System.Exception)
    {

        throw;
    }
  }
}
