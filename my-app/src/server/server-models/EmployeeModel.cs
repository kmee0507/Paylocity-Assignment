using DependentModel

public class EmployeeModel : PersonModel {
  public bool startsWithA;
  public DependentModel[] dependents;

  public static BuildParametersForEmployee() {
    SQLParameter[] parameters = new SQLParameter[]
    {
      new SQLParameter("@FirstName", SqlDbType.VarChar, 255)
      {
        Direction = ParameterDirection.Output;
      }
      new SQLParameter("@LastName", SqlDbType.VarChar, 255)
      {
        Direction = ParameterDirection.Output;
      }
      new SQLParameter("@StartsWithA", SqlDbType.VarChar, 1)
      {
        Direction = ParameterDirection.Output;
      }
      new SQLParameter("@Dependents", SqlDbType.VarChar, 255)
      {
        Direction = ParameterDirection.Output;
      }
    }
  }

  public static PopulateEmployeeListObject(SQLParameter[] parameters)
  {

  }
}
